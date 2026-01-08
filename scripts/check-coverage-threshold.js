#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const https = require('https');

/**
 * Parse lcov file and extract coverage data
 * @param {string} lcovPath - Path to lcov.info file
 * @returns {Map<string, {lines: {hit: number, found: number}, branches: {hit: number, found: number}}>}
 */
function parseLcov(lcovPath) {
  const lcovContent = fs.readFileSync(lcovPath, 'utf8');
  const files = new Map();

  let currentFile = null;
  let currentData = { lines: { hit: 0, found: 0 }, branches: { hit: 0, found: 0 } };

  lcovContent.split('\n').forEach(line => {
    if (line.startsWith('SF:')) {
      // Start of a new file
      currentFile = line.substring(3);
      currentData = { lines: { hit: 0, found: 0 }, branches: { hit: 0, found: 0 } };
    } else if (line.startsWith('DA:')) {
      // Line data: DA:<line>,<hit count>
      const parts = line.substring(3).split(',');
      const hitCount = parseInt(parts[1], 10);
      currentData.lines.found++;
      if (hitCount > 0) {
        currentData.lines.hit++;
      }
    } else if (line.startsWith('BRDA:')) {
      // Branch data: BRDA:<line>,<block>,<branch>,<hit count>
      const parts = line.substring(5).split(',');
      const hitCount = parts[3];
      if (hitCount !== '-') {
        currentData.branches.found++;
        if (parseInt(hitCount, 10) > 0) {
          currentData.branches.hit++;
        }
      }
    } else if (line === 'end_of_record' && currentFile) {
      files.set(currentFile, currentData);
      currentFile = null;
    }
  });

  return files;
}

/**
 * Get list of changed files in the PR
 * @param {string} baseRef - Base branch (e.g., 'origin/main')
 * @returns {string[]} - Array of changed file paths
 */
function getChangedFiles(baseRef) {
  try {
    const output = execSync(`git diff --name-only ${baseRef}...HEAD`, { encoding: 'utf8' });
    return output.split('\n').filter(f => f.trim().length > 0);
  } catch (error) {
    console.error('Error getting changed files:', error.message);
    return [];
  }
}

/**
 * Calculate coverage percentage for a set of files
 * @param {Map} coverageData - Coverage data from parseLcov
 * @param {string[]} changedFiles - List of changed files
 * @param {string} coverageRoot - Root directory for coverage files
 * @returns {{coverage: number, details: object}}
 */
function calculateCoverage(coverageData, changedFiles, coverageRoot) {
  let totalLines = 0;
  let coveredLines = 0;
  const fileDetails = [];

  changedFiles.forEach(file => {
    // Try to match the file in coverage data
    // Coverage paths might be absolute or relative
    let matchedEntry = null;

    for (const [coveragePath, data] of coverageData.entries()) {
      // Normalize paths for comparison
      const normalizedCoveragePath = coveragePath.replace(/^\//, '').replace(/\\/g, '/');
      const normalizedFile = file.replace(/\\/g, '/');
      const normalizedFileWithRoot = path.join(coverageRoot, file).replace(/\\/g, '/');

      if (normalizedCoveragePath.endsWith(normalizedFile) ||
          normalizedCoveragePath === normalizedFileWithRoot ||
          normalizedCoveragePath === normalizedFile) {
        matchedEntry = { path: coveragePath, data };
        break;
      }
    }

    if (matchedEntry && matchedEntry.data.lines.found > 0) {
      totalLines += matchedEntry.data.lines.found;
      coveredLines += matchedEntry.data.lines.hit;

      const fileCoverage = (matchedEntry.data.lines.hit / matchedEntry.data.lines.found * 100).toFixed(2);
      fileDetails.push({
        file,
        coverage: fileCoverage,
        lines: matchedEntry.data.lines
      });
    }
  });

  const coverage = totalLines > 0 ? (coveredLines / totalLines * 100) : 100;

  return {
    coverage: parseFloat(coverage.toFixed(2)),
    totalLines,
    coveredLines,
    fileDetails
  };
}

/**
 * Make GitHub API request
 * @param {string} token - GitHub token
 * @param {string} method - HTTP method
 * @param {string} path - API path
 * @param {object} data - Request body
 * @returns {Promise<object>}
 */
function githubRequest(token, method, path, data = null) {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'api.github.com',
      port: 443,
      path,
      method,
      headers: {
        'Authorization': `token ${token}`,
        'User-Agent': 'coverage-check-script',
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json'
      }
    };

    const req = https.request(options, (res) => {
      let body = '';
      res.on('data', (chunk) => body += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          resolve(JSON.parse(body || '{}'));
        } else {
          reject(new Error(`GitHub API error: ${res.statusCode} ${body}`));
        }
      });
    });

    req.on('error', reject);

    if (data) {
      req.write(JSON.stringify(data));
    }

    req.end();
  });
}

/**
 * Find existing coverage comment
 * @param {string} token - GitHub token
 * @param {string} repo - Repository (owner/repo)
 * @param {number} prNumber - PR number
 * @param {string} identifier - Comment identifier
 * @returns {Promise<object|null>}
 */
async function findExistingComment(token, repo, prNumber, identifier) {
  try {
    const comments = await githubRequest(token, 'GET', `/repos/${repo}/issues/${prNumber}/comments`);
    return comments.find(comment => comment.body.includes(identifier)) || null;
  } catch (error) {
    console.error('Error finding existing comment:', error.message);
    return null;
  }
}

/**
 * Format coverage report as markdown
 * @param {object} result - Coverage result
 * @param {number} threshold - Coverage threshold
 * @param {string} title - Report title
 * @returns {string}
 */
function formatMarkdownReport(result, threshold, title) {
  const identifier = `<!-- coverage-check: ${title} -->`;
  const status = result.coverage >= threshold ? '✅' : '❌';
  const statusText = result.coverage >= threshold
    ? `Coverage **${result.coverage}%** meets threshold **${threshold}%**`
    : `Coverage **${result.coverage}%** is below threshold **${threshold}%**`;

  let markdown = `${identifier}\n\n`;
  markdown += `## ${status} ${title}\n\n`;
  markdown += `${statusText}\n\n`;

  if (result.fileDetails.length > 0) {
    markdown += `### Coverage by File\n\n`;
    markdown += `| File | Coverage | Lines |\n`;
    markdown += `|------|----------|-------|\n`;

    result.fileDetails.forEach(({ file, coverage, lines }) => {
      const icon = parseFloat(coverage) >= threshold ? '✅' : '❌';
      markdown += `| ${icon} \`${file}\` | **${coverage}%** | ${lines.hit}/${lines.found} |\n`;
    });

    markdown += `\n**Total:** ${result.coveredLines}/${result.totalLines} lines covered\n`;
  } else {
    markdown += `\n_No testable changes detected (changes may be in test files, config, etc.)_\n`;
  }

  return markdown;
}

/**
 * Post or update PR comment
 * @param {string} token - GitHub token
 * @param {string} repo - Repository (owner/repo)
 * @param {number} prNumber - PR number
 * @param {string} body - Comment body
 * @param {string} identifier - Comment identifier
 */
async function postOrUpdateComment(token, repo, prNumber, body, identifier) {
  try {
    const existingComment = await findExistingComment(token, repo, prNumber, identifier);

    if (existingComment) {
      await githubRequest(token, 'PATCH', `/repos/${repo}/issues/comments/${existingComment.id}`, { body });
      console.log('✓ Updated existing PR comment');
    } else {
      await githubRequest(token, 'POST', `/repos/${repo}/issues/${prNumber}/comments`, { body });
      console.log('✓ Posted new PR comment');
    }
  } catch (error) {
    console.error('Error posting/updating comment:', error.message);
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const lcovFile = args[0];
  const threshold = parseFloat(args[1] || '70');
  const baseRef = args[2] || 'origin/main';
  const coverageRoot = args[3] || '';
  const title = args[4] || 'Coverage Report';

  // GitHub context from environment variables
  const githubToken = process.env.GITHUB_TOKEN;
  const githubRepo = process.env.GITHUB_REPOSITORY;
  const prNumber = process.env.PR_NUMBER;

  if (!lcovFile) {
    console.error('Usage: node check-coverage-threshold.js <lcov-file> [threshold] [base-ref] [coverage-root] [title]');
    process.exit(1);
  }

  if (!fs.existsSync(lcovFile)) {
    console.error(`Error: LCOV file not found: ${lcovFile}`);
    process.exit(1);
  }

  console.log('🔍 Checking coverage on changed files...\n');
  console.log(`Base ref: ${baseRef}`);
  console.log(`Threshold: ${threshold}%\n`);

  // Get changed files
  const changedFiles = getChangedFiles(baseRef);
  console.log(`Found ${changedFiles.length} changed files`);

  if (changedFiles.length === 0) {
    console.log('✅ No files changed, skipping coverage check');
    process.exit(0);
  }

  // Parse lcov
  const coverageData = parseLcov(lcovFile);
  console.log(`Parsed coverage data for ${coverageData.size} files\n`);

  // Calculate coverage for changed files
  const result = calculateCoverage(coverageData, changedFiles, coverageRoot);

  console.log('📊 Coverage Report for Changed Files:');
  console.log('─'.repeat(60));

  if (result.fileDetails.length > 0) {
    result.fileDetails.forEach(({ file, coverage, lines }) => {
      console.log(`  ${file}`);
      console.log(`    Coverage: ${coverage}% (${lines.hit}/${lines.found} lines)`);
    });
    console.log('─'.repeat(60));
    console.log(`  Total Coverage: ${result.coverage}% (${result.coveredLines}/${result.totalLines} lines)\n`);
  } else {
    console.log('  No coverage data found for changed files');
    console.log('  (This might be normal if changes are only in test files, config, etc.)\n');
  }

  // Post PR comment if GitHub context is available
  if (githubToken && githubRepo && prNumber) {
    console.log('\n📝 Posting coverage report to PR...');
    const markdown = formatMarkdownReport(result, threshold, title);
    const identifier = `<!-- coverage-check: ${title} -->`;
    await postOrUpdateComment(githubToken, githubRepo, parseInt(prNumber), markdown, identifier);
  }

  // Check threshold
  if (result.fileDetails.length === 0) {
    console.log('✅ Coverage check passed (no testable changes)');
    process.exit(0);
  }

  if (result.coverage < threshold) {
    console.error(`\n❌ Coverage ${result.coverage}% is below threshold ${threshold}%`);
    console.error(`   Please add tests to cover the new code.\n`);
    process.exit(1);
  } else {
    console.log(`\n✅ Coverage ${result.coverage}% meets threshold ${threshold}%\n`);
    process.exit(0);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
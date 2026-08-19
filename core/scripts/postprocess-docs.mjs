import { existsSync, readdirSync, readFileSync, rmSync, writeFileSync } from 'fs';
import { join } from 'path';
import { pathToFileURL } from 'url';

const COMPONENT_TAG_PREFIX = 'cat-';

export const docsDir = join(process.cwd(), '..', 'docs');

/**
 * Strip the `cat-` component tag prefix from generated documentation content.
 * Event names like `catChange` are preserved because they do not use a hyphen.
 */
export function stripComponentTagPrefix(content) {
  return content
    .replace(/^# cat-/gm, '# ')
    .replace(/\]\(\.\.\/cat-/g, '](../')
    .replace(/\[(cat-[a-z][a-z0-9-]*)\]/g, (_, tag) => `[${tag.slice(COMPONENT_TAG_PREFIX.length)}]`)
    .replace(/\bcat-([a-z][a-z0-9-]*)/g, '$1');
}

/** Convert sibling-folder doc links to flat markdown file links. */
export function flattenDocLinks(content) {
  return content.replace(/\]\(\.\.\/([a-z][a-z0-9-]*)\)/g, ']($1.md)');
}

/** Remove the auto-generated dependencies section from component docs. */
export function removeDependenciesSection(content) {
  return content.replace(/\n## Dependencies[\s\S]*?(?=\n-{10,})/, '');
}

/** Remove the auto-generated footer and divider from component docs. */
export function removeFooter(content) {
  return content.replace(/\n-{10,}\n\n[\s\S]*$/, '').trimEnd() + '\n';
}

/** Remove level-3 and level-4 markdown headings (method signatures, Parameters, Returns). */
export function removeSubHeadings(content) {
  return content.replace(/^#{3,4} /gm, '');
}

function formatDocContent(content) {
  return removeSubHeadings(
    removeFooter(removeDependenciesSection(flattenDocLinks(stripComponentTagPrefix(content))))
  );
}

function removeLegacyDocFolders(targetDir) {
  if (!existsSync(targetDir)) {
    return;
  }

  for (const entry of readdirSync(targetDir, { withFileTypes: true })) {
    if (!entry.isDirectory() || entry.name === 'components') {
      continue;
    }

    const folderPath = join(targetDir, entry.name);
    if (existsSync(join(folderPath, 'readme.md'))) {
      rmSync(folderPath, { recursive: true });
    }
  }
}

export function postprocessDocs(targetDocsDir = docsDir) {
  if (!existsSync(targetDocsDir)) {
    return;
  }

  const componentsDir = join(process.cwd(), 'src', 'components');
  if (existsSync(componentsDir)) {
    for (const entry of readdirSync(componentsDir)) {
      const readmePath = join(componentsDir, entry, 'readme.md');
      if (existsSync(readmePath)) {
        rmSync(readmePath);
      }
    }
  }

  const stencilDocsDir = join(targetDocsDir, 'components');
  if (existsSync(stencilDocsDir)) {
    for (const entry of readdirSync(stencilDocsDir)) {
      if (!entry.startsWith(COMPONENT_TAG_PREFIX)) {
        continue;
      }

      const sourceDir = join(stencilDocsDir, entry);
      const readmePath = join(sourceDir, 'readme.md');
      if (!existsSync(readmePath)) {
        continue;
      }

      const targetName = entry.slice(COMPONENT_TAG_PREFIX.length);
      const content = formatDocContent(readFileSync(readmePath, 'utf8'));

      writeFileSync(join(targetDocsDir, `${targetName}.md`), content);
      rmSync(sourceDir, { recursive: true });
    }

    if (readdirSync(stencilDocsDir).length === 0) {
      rmSync(stencilDocsDir, { recursive: true });
    }
  }

  removeLegacyDocFolders(targetDocsDir);

  for (const entry of readdirSync(targetDocsDir)) {
    if (!entry.endsWith('.md')) {
      continue;
    }

    const filePath = join(targetDocsDir, entry);
    const content = readFileSync(filePath, 'utf8');
    const updated = formatDocContent(content);

    if (updated !== content) {
      writeFileSync(filePath, updated);
    }
  }
}

const isDirectRun = process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href;
if (isDirectRun) {
  postprocessDocs();
}

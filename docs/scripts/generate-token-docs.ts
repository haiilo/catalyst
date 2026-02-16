import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

// Types for token structure
interface Token {
  $type: string;
  $value: string | number;
  cssProp?: string;
}

interface TokenGroup {
  [key: string]: Token | TokenGroup;
}

const TOKENS_DIR = join(process.cwd(), '../tokens');
const OUTPUT_DIR = join(process.cwd(), 'generated-tokens');

// Read figma.json which has resolved values
function readFigmaTokens(): TokenGroup {
  const figmaPath = join(TOKENS_DIR, 'dist/export/figma.json');
  return JSON.parse(readFileSync(figmaPath, 'utf-8'));
}

// Convert hex to RGB
function hexToRgb(hex: string): string {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(hex);
  if (!result) return '';
  const r = parseInt(result[1], 16);
  const g = parseInt(result[2], 16);
  const b = parseInt(result[3], 16);
  const a = result[4] ? parseInt(result[4], 16) / 255 : undefined;
  if (a !== undefined && a < 1) {
    return `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})`;
  }
  return `rgb(${r}, ${g}, ${b})`;
}

// Check if an object is a token (has $type and $value)
function isToken(obj: unknown): obj is Token {
  return (
    typeof obj === 'object' &&
    obj !== null &&
    '$type' in obj &&
    '$value' in obj
  );
}

// Format token value based on type
function formatValue(token: Token): string {
  const value = token.$value;
  if (typeof value === 'number') {
    // Add px suffix for dimensions
    if (token.$type === 'dimension') {
      return `${value}px`;
    }
    return String(value);
  }
  return String(value);
}

// Flatten tokens into array with paths
interface FlatToken {
  path: string;
  token: Token;
}

function flattenTokens(obj: TokenGroup, prefix: string = ''): FlatToken[] {
  const result: FlatToken[] = [];

  for (const [key, value] of Object.entries(obj)) {
    const path = prefix ? `${prefix}.${key}` : key;

    if (isToken(value)) {
      result.push({ path, token: value });
    } else if (typeof value === 'object' && value !== null) {
      result.push(...flattenTokens(value as TokenGroup, path));
    }
  }

  return result;
}

// Group tokens by first-level key
function groupByCategory(tokens: FlatToken[], basePath: string): Map<string, FlatToken[]> {
  const groups = new Map<string, FlatToken[]>();

  for (const item of tokens) {
    // Remove basePath prefix and get first segment as category
    const relativePath = item.path.replace(`${basePath}.`, '');
    const parts = relativePath.split('.');
    const category = parts[0];

    if (!groups.has(category)) {
      groups.set(category, []);
    }
    groups.get(category)!.push(item);
  }

  return groups;
}

// Format category name for heading
function formatCategoryName(name: string): string {
  // camelCase to Title Case
  return name
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (str) => str.toUpperCase())
    .trim();
}

// Generate markdown for color tokens (kept for reference, colors now use ColorTokenTable component)
function generateColorMarkdown(tokens: FlatToken[], basePath: string): string {
  const groups = groupByCategory(tokens, basePath);
  const sections: string[] = [];

  for (const [category, categoryTokens] of groups) {
    const rows = categoryTokens.map((item) => {
      const hex = String(item.token.$value);
      const rgb = hexToRgb(hex);
      return `| \`${item.path}\` | \`${hex}\` | \`${rgb}\` |`;
    });

    sections.push(`### ${formatCategoryName(category)}

| Token | Hex | RGB |
|-------|-----|-----|
${rows.join('\n')}`);
  }

  return sections.join('\n\n');
}

// Generate markdown for flat color tokens (kept for reference, colors now use ColorTokenTable component)
function generateFlatColorMarkdown(tokens: FlatToken[]): string {
  const groups = new Map<string, FlatToken[]>();

  // Group by color family (neutral, brand, blue, etc.)
  for (const item of tokens) {
    const parts = item.path.split('.');
    // color.base.neutral.100 -> neutral
    const family = parts[2] || 'other';

    if (!groups.has(family)) {
      groups.set(family, []);
    }
    groups.get(family)!.push(item);
  }

  const sections: string[] = [];

  for (const [family, familyTokens] of groups) {
    const rows = familyTokens.map((item) => {
      const hex = String(item.token.$value);
      const rgb = hexToRgb(hex);
      return `| \`${item.path}\` | \`${hex}\` | \`${rgb}\` |`;
    });

    sections.push(`### ${formatCategoryName(family)}

| Token | Hex | RGB |
|-------|-----|-----|
${rows.join('\n')}`);
  }

  return sections.join('\n\n');
}

// Generate markdown for dimension tokens
function generateDimensionMarkdown(tokens: FlatToken[]): string {
  const rows = tokens.map((item) => {
    const value = formatValue(item.token);
    return `| \`${item.path}\` | \`${value}\` |`;
  });

  return `| Token | Value |
|-------|-------|
${rows.join('\n')}`;
}

// Generate markdown for generic tokens
function generateGenericMarkdown(tokens: FlatToken[]): string {
  const rows = tokens.map((item) => {
    const value = formatValue(item.token);
    return `| \`${item.path}\` | \`${value}\` |`;
  });

  return `| Token | Value |
|-------|-------|
${rows.join('\n')}`;
}

// Generate markdown for font tokens with cssProp
function generateFontMarkdown(tokens: FlatToken[], basePath: string): string {
  const rows = tokens.map((item) => {
    const value = formatValue(item.token);
    return `| \`${item.path}\` | \`${value}\` |`;
  });

  return `| Token | Value |
|-------|-------|
${rows.join('\n')}`;
}

// Generate markdown for size/font tokens (grouped by head, body, mono)
function generateSizeFontMarkdown(tokens: TokenGroup): string {
  const sections: string[] = [];
  const fontTokens = (tokens.size as TokenGroup)?.font as TokenGroup;
  const lineTokens = (tokens.size as TokenGroup)?.line as TokenGroup;

  if (!fontTokens) return '';

  // Generate font size sections
  for (const [category, values] of Object.entries(fontTokens)) {
    const flatTokens = flattenTokens({ [category]: values }, `size.font`);
    const rows = flatTokens.map((item) => {
      const value = formatValue(item.token);
      // Also get corresponding line height if available
      const lineKey = item.path.replace('size.font.', '');
      const parts = lineKey.split('.');
      const lineCategory = lineTokens?.[parts[0]];
      const lineValue = (lineCategory && typeof lineCategory === 'object' && !isToken(lineCategory))
        ? (lineCategory as TokenGroup)[parts[1]]
        : undefined;
      const lineHeight = lineValue && isToken(lineValue) ? formatValue(lineValue) : '-';
      return `| \`${item.path}\` | \`${value}\` | \`${lineHeight}\` |`;
    });

    sections.push(`### ${formatCategoryName(category)}

| Token | Font Size | Line Height |
|-------|-----------|-------------|
${rows.join('\n')}`);
  }

  return sections.join('\n\n');
}

// Main generation functions for each category
function generateColorBase(tokens: TokenGroup): string {
  const baseTokens = flattenTokens((tokens.color as TokenGroup).base as TokenGroup, 'color.base');
  return generateFlatColorMarkdown(baseTokens);
}

function generateColorUi(tokens: TokenGroup): string {
  const uiTokens = flattenTokens((tokens.color as TokenGroup).ui as TokenGroup, 'color.ui');
  return generateColorMarkdown(uiTokens, 'color.ui');
}

function generateColorTheme(tokens: TokenGroup): string {
  const themeTokens = flattenTokens((tokens.color as TokenGroup).theme as TokenGroup, 'color.theme');
  return generateColorMarkdown(themeTokens, 'color.theme');
}

function generateSizeBorder(tokens: TokenGroup): string {
  const borderTokens = flattenTokens((tokens.size as TokenGroup).border as TokenGroup, 'size.border');
  return generateDimensionMarkdown(borderTokens);
}

function generateSizeFont(tokens: TokenGroup): string {
  return generateSizeFontMarkdown(tokens);
}

function generateSizeModal(tokens: TokenGroup): string {
  const modalTokens = flattenTokens((tokens.size as TokenGroup).modal as TokenGroup, 'size.modal');
  return generateDimensionMarkdown(modalTokens);
}

function generateSizeScreen(tokens: TokenGroup): string {
  const screenTokens = flattenTokens((tokens.size as TokenGroup).screen as TokenGroup, 'size.screen');
  return generateDimensionMarkdown(screenTokens);
}

function generateSizeSpacing(tokens: TokenGroup): string {
  const spacingTokens = flattenTokens((tokens.size as TokenGroup).spacing as TokenGroup, 'size.spacing');
  return generateDimensionMarkdown(spacingTokens);
}

function generateFontFamily(tokens: TokenGroup): string {
  const familyTokens = flattenTokens((tokens.font as TokenGroup).family as TokenGroup, 'font.family');
  return generateGenericMarkdown(familyTokens);
}

function generateFontWeight(tokens: TokenGroup): string {
  const weightTokens = flattenTokens((tokens.font as TokenGroup).weight as TokenGroup, 'font.weight');
  return generateGenericMarkdown(weightTokens);
}

function generateFontDecoration(tokens: TokenGroup): string {
  const decorationTokens = flattenTokens((tokens.font as TokenGroup).decoration as TokenGroup, 'font.decoration');
  return generateGenericMarkdown(decorationTokens);
}

function generateOpacity(tokens: TokenGroup): string {
  const opacityTokens = flattenTokens(tokens.opacity as TokenGroup, 'opacity');
  return generateGenericMarkdown(opacityTokens);
}

function generateTimeTransition(tokens: TokenGroup): string {
  const transitionTokens = flattenTokens((tokens.time as TokenGroup).transition as TokenGroup, 'time.transition');
  return generateGenericMarkdown(transitionTokens);
}

function generateTimeDelay(tokens: TokenGroup): string {
  const delayTokens = flattenTokens((tokens.time as TokenGroup).delay as TokenGroup, 'time.delay');
  return generateGenericMarkdown(delayTokens);
}

function generateTimeDuration(tokens: TokenGroup): string {
  const durationTokens = flattenTokens((tokens.time as TokenGroup).duration as TokenGroup, 'time.duration');
  return generateGenericMarkdown(durationTokens);
}

// File generation config
interface FileConfig {
  name: string;
  generator: (tokens: TokenGroup) => string;
}

const files: FileConfig[] = [
  { name: 'color-base.md', generator: generateColorBase },
  { name: 'color-ui.md', generator: generateColorUi },
  { name: 'color-theme.md', generator: generateColorTheme },
  { name: 'size-border.md', generator: generateSizeBorder },
  { name: 'size-font.md', generator: generateSizeFont },
  { name: 'size-modal.md', generator: generateSizeModal },
  { name: 'size-screen.md', generator: generateSizeScreen },
  { name: 'size-spacing.md', generator: generateSizeSpacing },
  { name: 'font-family.md', generator: generateFontFamily },
  { name: 'font-weight.md', generator: generateFontWeight },
  { name: 'font-decoration.md', generator: generateFontDecoration },
  { name: 'opacity.md', generator: generateOpacity },
  { name: 'time-transition.md', generator: generateTimeTransition },
  { name: 'time-delay.md', generator: generateTimeDelay },
  { name: 'time-duration.md', generator: generateTimeDuration },
];

// Main execution
console.log('Generating token documentation...\n');

mkdirSync(OUTPUT_DIR, { recursive: true });

const tokens = readFigmaTokens();

for (const file of files) {
  try {
    const markdown = file.generator(tokens);
    const outputPath = join(OUTPUT_DIR, file.name);
    writeFileSync(outputPath, markdown);
    console.log(`  ✓ generated-tokens/${file.name}`);
  } catch (error) {
    console.error(`  ✗ ${file.name}: ${error}`);
  }
}

console.log(`\nDone! Generated ${files.length} files.`);

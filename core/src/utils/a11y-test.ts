import { E2EPage } from '@stencil/core/testing';
import type { Result, RunOptions } from 'axe-core';

// Import axe-core source to inject into page
import axeCore from 'axe-core';

/**
 * Rules to disable by default for component testing.
 * These are document-level rules that don't apply when testing isolated components.
 */
const COMPONENT_TEST_DISABLED_RULES = [
  'document-title', // Components don't provide page titles
  'html-has-lang', // Components don't set html lang attribute
  'landmark-one-main', // Components may be used inside landmarks
  'page-has-heading-one', // Individual components don't need h1
  'region' // Components may be placed inside regions by consumers
];

export interface A11yTestOptions {
  /**
   * Additional rules to disable for this specific test.
   * Use sparingly and document why each rule is disabled.
   */
  disabledRules?: string[];
  /**
   * If true, includes document-level rules (title, lang, landmarks).
   * Default is false for component testing.
   */
  includeDocumentRules?: boolean;
}

/**
 * Runs axe-core accessibility checks on the current page.
 * Returns violations array - empty if no issues found.
 *
 * By default, document-level rules are disabled since component tests
 * don't have full HTML documents with titles, lang attributes, etc.
 *
 * @example
 * ```typescript
 * const violations = await checkA11y(page);
 * expect(violations).toEqual([]);
 * ```
 */
export async function checkA11y(page: E2EPage, options: A11yTestOptions = {}): Promise<Result[]> {
  // Inject axe-core source into the page
  await page.addScriptTag({ content: axeCore.source });

  // Build list of disabled rules
  const disabledRules = [
    ...(options.includeDocumentRules ? [] : COMPONENT_TEST_DISABLED_RULES),
    ...(options.disabledRules || [])
  ];

  // Build axe run options - rules is an object keyed by rule ID
  const axeOptions: RunOptions = {};
  if (disabledRules.length) {
    axeOptions.rules = disabledRules.reduce(
      (acc, id) => ({ ...acc, [id]: { enabled: false } }),
      {} as Record<string, { enabled: boolean }>
    );
  }

  // Run axe in the page context
  const results = await page.evaluate((opts: RunOptions) => {
    return (window as unknown as { axe: typeof axeCore }).axe.run(document, opts);
  }, axeOptions);

  return results.violations;
}

/**
 * Formats axe violations into a readable string for test output.
 */
export function formatViolations(violations: Result[]): string {
  if (!violations.length) return 'No violations';

  return violations
    .map(v => {
      const nodes = v.nodes.map(n => `  - ${n.html}`).join('\n');
      return `[${v.impact}] ${v.id}: ${v.description}\n${nodes}`;
    })
    .join('\n\n');
}

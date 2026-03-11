import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-tooltip', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-tooltip></cat-tooltip>');
    const element = await page.locator('cat-tooltip');
    await expect(element).toHaveClass('hydrated');
  });
});

import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-date-inline', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-date-inline></cat-date-inline>');
    const element = await page.locator('cat-date-inline');
    await expect(element).toHaveClass('hydrated');
  });
});

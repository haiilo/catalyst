import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-tabs', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-tabs></cat-tabs>');
    const element = await page.locator('cat-tabs');
    await expect(element).toHaveClass('hydrated');
  });
});

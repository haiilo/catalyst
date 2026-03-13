import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-pagination', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-pagination></cat-pagination>');
    const element = await page.locator('cat-pagination');
    await expect(element).toHaveClass('hydrated');
  });
});

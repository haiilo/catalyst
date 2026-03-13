import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-date', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-date></cat-date>');
    const element = await page.locator('cat-date');
    await expect(element).toHaveClass('hydrated');
  });
});

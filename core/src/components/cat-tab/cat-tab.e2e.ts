import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-tab', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-tab></cat-tab>');
    const element = await page.locator('cat-tab');
    await expect(element).toHaveClass('hydrated');
  });
});

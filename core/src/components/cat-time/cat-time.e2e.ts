import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-time', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-time></cat-time>');
    const element = await page.locator('cat-time');
    await expect(element).toHaveClass('hydrated');
  });
});

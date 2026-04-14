import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-avatar', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-avatar label="Avatar"></cat-avatar>');
    const element = await page.locator('cat-avatar');
    await expect(element).toHaveClass('hydrated');
  });
});

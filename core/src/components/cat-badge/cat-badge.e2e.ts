import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-badge', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-badge></cat-badge>');
    const element = await page.locator('cat-badge');
    await expect(element).toHaveClass('hydrated');
  });
});

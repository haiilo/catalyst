import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-skeleton', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-skeleton></cat-skeleton>');
    const element = await page.locator('cat-skeleton');
    await expect(element).toHaveClass('hydrated');
  });
});

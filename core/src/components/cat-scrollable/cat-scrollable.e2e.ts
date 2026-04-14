import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-scrollable', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-scrollable></cat-scrollable>');
    const element = await page.locator('cat-scrollable');
    await expect(element).toHaveClass('hydrated');
  });
});

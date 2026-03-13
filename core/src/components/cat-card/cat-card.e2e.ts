import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-card', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-card></cat-card>');
    const element = await page.locator('cat-card');
    await expect(element).toHaveClass('hydrated');
  });
});

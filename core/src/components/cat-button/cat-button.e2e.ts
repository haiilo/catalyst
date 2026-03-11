import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-button', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-button></cat-button>');
    const element = await page.locator('cat-button');
    await expect(element).toHaveClass('hydrated');
  });
});

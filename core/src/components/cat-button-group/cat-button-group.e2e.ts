import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-button-group', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-button-group></cat-button-group>');
    const element = await page.locator('cat-button-group');
    await expect(element).toHaveClass('hydrated');
  });
});

import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-form-group', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-form-group></cat-form-group>');
    const element = await page.locator('cat-form-group');
    await expect(element).toHaveClass('hydrated');
  });
});

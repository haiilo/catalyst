import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-radio-group', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-radio-group></cat-radio-group>');
    const element = await page.locator('cat-radio-group');
    await expect(element).toHaveClass('hydrated');
  });
});

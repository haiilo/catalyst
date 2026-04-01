import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-alert', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-alert></cat-alert>');
    const element = await page.locator('cat-alert');
    await expect(element).toHaveClass('hydrated');
  });
});

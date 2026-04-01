import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-radio', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-radio label="Label"></cat-radio>');
    const element = await page.locator('cat-radio');
    await expect(element).toHaveClass('hydrated');
  });
});

import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-textarea', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-textarea label="Label"></cat-textarea>');
    const element = await page.locator('cat-textarea');
    await expect(element).toHaveClass('hydrated');
  });
});

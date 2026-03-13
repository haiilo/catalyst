import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-tag', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-tag label="Label"></cat-tag>');
    const element = await page.locator('cat-tag');
    await expect(element).toHaveClass('hydrated');
  });
});

import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-icon', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-icon icon="icon"></cat-icon>');
    const element = await page.locator('cat-icon');
    await expect(element).toHaveClass('hydrated');
  });
});

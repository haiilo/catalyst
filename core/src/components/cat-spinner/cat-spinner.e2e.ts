import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-spinner', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-spinner></cat-spinner>');
    const element = await page.locator('cat-spinner');
    await expect(element).toHaveClass('hydrated');
  });
});

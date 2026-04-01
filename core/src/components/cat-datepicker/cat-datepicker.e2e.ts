import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-datepicker', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-datepicker label="Label"></cat-datepicker>');
    const element = await page.locator('cat-datepicker');
    await expect(element).toHaveClass('hydrated');
  });
});

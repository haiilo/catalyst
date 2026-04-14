import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-datepicker-inline', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-datepicker-inline></cat-datepicker-inline>');
    const element = await page.locator('cat-datepicker-inline');
    await expect(element).toHaveClass('hydrated');
  });
});

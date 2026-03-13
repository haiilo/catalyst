import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-dropdown', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-dropdown><button slot="trigger"></button><nav slot="content"></nav></cat-dropdown>');
    const element = await page.locator('cat-dropdown');
    await expect(element).toHaveClass('hydrated');
  });
});

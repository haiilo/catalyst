import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-toggle', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-toggle label="Label"></cat-toggle>');
    const element = await page.locator('cat-toggle');
    await expect(element).toHaveClass('hydrated');
  });

  test('should toggle on state on click', async ({ page }) => {
    await page.setContent('<cat-toggle label="Enable feature"></cat-toggle>');
    const toggle = await page.locator('cat-toggle');
    const catChange = await page.spyOnEvent('catChange');

    await toggle.click();
    await page.waitForChanges();

    expect(catChange).toHaveReceivedEvent();
    await expect(toggle).toHaveJSProperty('checked', true);
  });

  test('should start as checked when checked attribute is set', async ({ page }) => {
    await page.setContent('<cat-toggle label="Pre-enabled" checked></cat-toggle>');
    const toggle = await page.locator('cat-toggle');
    await expect(toggle).toHaveJSProperty('checked', true);
  });

  test('should not toggle when disabled', async ({ page }) => {
    await page.setContent('<cat-toggle label="Disabled" disabled></cat-toggle>');
    const toggle = await page.locator('cat-toggle');
    const catChange = await page.spyOnEvent('catChange');

    await toggle.click();
    await page.waitForChanges();

    expect(catChange).not.toHaveReceivedEvent();
  });

  test('should toggle from on to off', async ({ page }) => {
    await page.setContent('<cat-toggle label="Toggle" checked></cat-toggle>');
    const toggle = await page.locator('cat-toggle');

    await toggle.click();
    await page.waitForChanges();

    await expect(toggle).toHaveJSProperty('checked', false);
  });

  test('should display label text', async ({ page }) => {
    await page.setContent('<cat-toggle label="My Toggle"></cat-toggle>');
    const toggle = await page.locator('cat-toggle');
    await expect(toggle).toHaveAttribute('label', 'My Toggle');
  });

  test('should have required attribute', async ({ page }) => {
    await page.setContent('<cat-toggle label="Required" required></cat-toggle>');
    const toggle = await page.locator('cat-toggle');
    await expect(toggle).toHaveJSProperty('required', true);
  });

  test('should have hint text', async ({ page }) => {
    await page.setContent('<cat-toggle label="Toggle" hint="Helper text"></cat-toggle>');
    const toggle = await page.locator('cat-toggle');
    await expect(toggle).toHaveAttribute('hint', 'Helper text');
  });

  test('should display label on left when labelLeft is true', async ({ page }) => {
    await page.setContent('<cat-toggle label="Left Label" label-left></cat-toggle>');
    const toggle = await page.locator('cat-toggle');
    await expect(toggle).toHaveJSProperty('labelLeft', true);
  });

  test('should handle keyboard interaction - Space key', async ({ page }) => {
    await page.setContent('<cat-toggle label="Keyboard"></cat-toggle>');
    const toggle = await page.locator('cat-toggle');
    const catChange = await page.spyOnEvent('catChange');

    await toggle.press('Space');
    await page.waitForChanges();

    expect(catChange).toHaveReceivedEvent();
  });
});

import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-checkbox', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-checkbox label="Label"></cat-checkbox>');
    const element = await page.locator('cat-checkbox');
    await expect(element).toHaveClass('hydrated');
  });

  test('should toggle checked state on click', async ({ page }) => {
    await page.setContent('<cat-checkbox label="Accept terms"></cat-checkbox>');
    const checkbox = await page.locator('cat-checkbox');
    const catChange = await page.spyOnEvent('catChange');

    await checkbox.click();
    await page.waitForChanges();

    expect(catChange).toHaveReceivedEvent();
    await expect(checkbox).toHaveJSProperty('checked', true);
  });

  test('should start as checked when checked attribute is set', async ({ page }) => {
    await page.setContent('<cat-checkbox label="Pre-checked" checked></cat-checkbox>');
    const checkbox = await page.locator('cat-checkbox');
    await expect(checkbox).toHaveJSProperty('checked', true);
  });

  test('should not toggle when disabled', async ({ page }) => {
    await page.setContent('<cat-checkbox label="Disabled" disabled></cat-checkbox>');
    const checkbox = await page.locator('cat-checkbox');
    const catChange = await page.spyOnEvent('catChange');

    await checkbox.click();
    await page.waitForChanges();

    expect(catChange).not.toHaveReceivedEvent();
  });

  test('should toggle from checked to unchecked', async ({ page }) => {
    await page.setContent('<cat-checkbox label="Toggle" checked></cat-checkbox>');
    const checkbox = await page.locator('cat-checkbox');

    await checkbox.click();
    await page.waitForChanges();

    await expect(checkbox).toHaveJSProperty('checked', false);
  });

  test('should work with indeterminate state', async ({ page }) => {
    await page.setContent('<cat-checkbox label="Indeterminate" indeterminate></cat-checkbox>');
    const checkbox = await page.locator('cat-checkbox');
    await expect(checkbox).toHaveJSProperty('indeterminate', true);
  });

  test('should display label text', async ({ page }) => {
    await page.setContent('<cat-checkbox label="My Label"></cat-checkbox>');
    const checkbox = await page.locator('cat-checkbox');
    await expect(checkbox).toHaveAttribute('label', 'My Label');
  });

  test('should have required attribute', async ({ page }) => {
    await page.setContent('<cat-checkbox label="Required" required></cat-checkbox>');
    const checkbox = await page.locator('cat-checkbox');
    await expect(checkbox).toHaveJSProperty('required', true);
  });

  test('should have hint text', async ({ page }) => {
    await page.setContent('<cat-checkbox label="Checkbox" hint="Helper text"></cat-checkbox>');
    const checkbox = await page.locator('cat-checkbox');
    await expect(checkbox).toHaveAttribute('hint', 'Helper text');
  });
});

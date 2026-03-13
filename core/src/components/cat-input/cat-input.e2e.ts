import { expect } from '@playwright/test';
import { test } from '@stencil/playwright';

test.describe('cat-input', () => {
  test('renders', async ({ page }) => {
    await page.setContent('<cat-input label="Label"></cat-input>');
    const element = await page.locator('cat-input');
    await expect(element).toHaveClass('hydrated');
  });

  test('should input type="number" allow typing numeric characters', async ({ page }) => {
    await page.setContent('<cat-input type="number"></cat-input>');
    const input = await page.locator('cat-input input');
    // Entering a mix of allowed and disallowed characters
    const testSequence = ['1', 'a', '2', '.', '1', '@', '#'];
    for (const key of testSequence) {
      await input.press(key);
    }

    await expect(input).toHaveValue('12.1');
  });

  test('should accept text input and emit catChange event', async ({ page }) => {
    await page.setContent('<cat-input value=""></cat-input>');
    const input = await page.locator('cat-input input');
    const catChange = await page.spyOnEvent('catChange');

    await input.press('H');
    await input.press('e');
    await input.press('l');
    await input.press('l');
    await input.press('o');

    await page.waitForChanges();
    expect(catChange).toHaveReceivedEventTimes(5);

    await expect(input).toHaveValue('Hello');
  });

  test('should trigger focus event', async ({ page }) => {
    await page.setContent('<cat-input></cat-input>');
    const input = await page.locator('cat-input input');
    await input.focus();
    await page.waitForChanges();

    const isFocused = await page.evaluate(() => document.activeElement === document.querySelector('cat-input'));
    expect(isFocused).toBe(true);
  });

  test('should not accept input when disabled', async ({ page }) => {
    await page.setContent('<cat-input disabled></cat-input>');
    const input = await page.locator('cat-input input');
    const catChange = await page.spyOnEvent('catChange');

    await input.press('a');
    await page.waitForChanges();

    expect(catChange).not.toHaveReceivedEvent();
  });

  test('should display error state', async ({ page }) => {
    await page.setContent('<cat-input errors="Field is required"></cat-input>');
    const element = await page.locator('cat-input');
    await expect(element).toHaveAttribute('errors');
  });

  test('should clear input value', async ({ page }) => {
    await page.setContent('<cat-input value="test" clearable></cat-input>');
    const element = await page.locator('cat-input');
    await element.evaluate((el: HTMLCatInputElement) => el.clear());
    await page.waitForChanges();

    await expect(page.locator('cat-input input')).toHaveValue('');
  });

  test('should work as password field', async ({ page }) => {
    await page.setContent('<cat-input type="password"></cat-input>');
    const input = await page.locator('cat-input input');
    await expect(input).toHaveAttribute('type', 'password');
  });

  test('should work as email field', async ({ page }) => {
    await page.setContent('<cat-input type="email"></cat-input>');
    const input = await page.locator('cat-input input');
    await expect(input).toHaveAttribute('type', 'email');
  });
});

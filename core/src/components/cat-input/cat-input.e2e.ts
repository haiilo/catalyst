import { newE2EPage } from '@stencil/core/testing';

describe('cat-input', () => {
  beforeAll(() => (console.error = jest.fn()));

  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-input label="Label"></cat-input>');

    const element = await page.find('cat-input');
    expect(element).toHaveClass('hydrated');
  });

  it('should input type="number" allow typing numeric characters', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-input type="number"></cat-input>');
    const input = await page.find('cat-input >>> input');
    // Entering a mix of allowed and disallowed characters
    const testSequence = ['1', 'a', '2', '.', '1', '@', '#'];
    for (const key of testSequence) {
      await input.press(key);
    }

    const value = await input.getProperty('value');

    expect(value).toBe('12.1');
  });

  it('should accept text input and emit catChange event', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-input value=""></cat-input>');

    const input = await page.find('cat-input >>> input');
    const catChange = await page.spyOnEvent('catChange');

    await input.press('H');
    await input.press('e');
    await input.press('l');
    await input.press('l');
    await input.press('o');

    await page.waitForChanges();
    expect(catChange).toHaveReceivedEventTimes(5);

    const value = await input.getProperty('value');
    expect(value).toBe('Hello');
  });

  it('should trigger focus event', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-input></cat-input>');

    const input = await page.find('cat-input >>> input');
    await input.focus();
    await page.waitForChanges();

    const isFocused = await page.evaluate(() => document.activeElement === document.querySelector('cat-input'));
    expect(isFocused).toBe(true);
  });

  it('should not accept input when disabled', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-input disabled></cat-input>');

    const input = await page.find('cat-input >>> input');
    const catChange = await page.spyOnEvent('catChange');

    await input.press('a');
    await page.waitForChanges();

    expect(catChange).not.toHaveReceivedEvent();
  });

  it('should display error state', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-input errors="Field is required"></cat-input>');

    const element = await page.find('cat-input');
    expect(element).toHaveAttribute('errors');
  });

  it('should clear input value', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-input value="test" clearable></cat-input>');

    const element = await page.find('cat-input');
    await element.callMethod('clear');
    await page.waitForChanges();

    const value = await element.getProperty('value');
    expect(value).toBe('');
  });

  it('should work as password field', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-input type="password"></cat-input>');

    const input = await page.find('cat-input >>> input');
    const type = await input.getProperty('type');

    expect(type).toBe('password');
  });

  it('should work as email field', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-input type="email"></cat-input>');

    const input = await page.find('cat-input >>> input');
    const type = await input.getProperty('type');

    expect(type).toBe('email');
  });
});

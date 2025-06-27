import { newE2EPage } from '@stencil/core/testing';

describe('cat-input', () => {
  beforeAll(() => (console.error = jest.fn()));

  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-input label="Label"></cat-input>');

    const element = await page.find('cat-input');
    expect(element).toHaveClass('hydrated');
  });

  fit('should input type="number" allow typing numeric characters', async () => {
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
});

import { newE2EPage } from '@stencil/core/testing';

describe('cat-select', () => {
  it('renders', async () => {
    console.error = jest.fn();
    console.warn = jest.fn()
    const page = await newE2EPage();
    await page.setContent('<cat-select label="Label"></cat-select>');

    const element = await page.find('cat-select');
    expect(element).toHaveClass('hydrated');
    expect(console.error).toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalled();
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('cat-pagination', () => {
  it('renders', async () => {
    console.error = jest.fn();
    console.warn = jest.fn();
    const page = await newE2EPage();
    await page.setContent('<cat-pagination></cat-pagination>');

    const element = await page.find('cat-pagination');
    expect(element).toHaveClass('hydrated');
    expect(console.error).toHaveBeenCalled();
    expect(console.warn).toHaveBeenCalled();
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('cat-input', () => {
  it('renders', async () => {
    console.error = jest.fn();
    const page = await newE2EPage();
    await page.setContent('<cat-input label="Label"></cat-input>');

    const element = await page.find('cat-input');
    expect(element).toHaveClass('hydrated');
    expect(console.error).toHaveBeenCalled();
  });
});

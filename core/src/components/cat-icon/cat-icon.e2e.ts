import { newE2EPage } from '@stencil/core/testing';

describe('cat-icon', () => {
  it('renders', async () => {
    console.error = jest.fn();
    const page = await newE2EPage();
    await page.setContent('<cat-icon icon="icon"></cat-icon>');

    const element = await page.find('cat-icon');
    expect(element).toHaveClass('hydrated');
    expect(console.error).toHaveBeenCalled();
  });
});

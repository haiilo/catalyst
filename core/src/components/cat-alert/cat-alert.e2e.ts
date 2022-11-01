import { newE2EPage } from '@stencil/core/testing';

describe('cat-alert', () => {
  it('renders', async () => {
    console.error = jest.fn();
    const page = await newE2EPage();
    await page.setContent('<cat-alert></cat-alert>');

    const element = await page.find('cat-alert');
    expect(element).toHaveClass('hydrated');
    expect(console.error).toHaveBeenCalled();
  });
});

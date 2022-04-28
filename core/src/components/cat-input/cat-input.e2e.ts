import { newE2EPage } from '@stencil/core/testing';

describe('cat-input', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-input></cat-input>');

    const element = await page.find('cat-input');
    expect(element).toHaveClass('hydrated');
  });
});

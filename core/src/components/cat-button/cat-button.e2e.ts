import { newE2EPage } from '@stencil/core/testing';

describe('cat-button', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-button></cat-button>');

    const element = await page.find('cat-button');
    expect(element).toHaveClass('hydrated');
  });
});

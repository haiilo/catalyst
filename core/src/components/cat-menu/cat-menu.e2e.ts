import { newE2EPage } from '@stencil/core/testing';

describe('cat-menu', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-menu></cat-menu>');

    const element = await page.find('cat-menu');
    expect(element).toHaveClass('hydrated');
  });
});

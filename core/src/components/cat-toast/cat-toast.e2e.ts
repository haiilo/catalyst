import { newE2EPage } from '@stencil/core/testing';

describe('cat-toast', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-toast></cat-toast>');

    const element = await page.find('cat-toast');
    expect(element).toHaveClass('hydrated');
  });
});

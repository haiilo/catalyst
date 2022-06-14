import { newE2EPage } from '@stencil/core/testing';

describe('cat-tab', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-tab></cat-tab>');

    const element = await page.find('cat-tab');
    expect(element).toHaveClass('hydrated');
  });
});

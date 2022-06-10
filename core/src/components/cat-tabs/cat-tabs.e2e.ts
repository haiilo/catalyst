import { newE2EPage } from '@stencil/core/testing';

describe('cat-tabs', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-tabs></cat-tabs>');

    const element = await page.find('cat-tabs');
    expect(element).toHaveClass('hydrated');
  });
});

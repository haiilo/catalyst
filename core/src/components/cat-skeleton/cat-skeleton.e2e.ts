import { newE2EPage } from '@stencil/core/testing';

describe('cat-skeleton', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-skeleton></cat-skeleton>');

    const element = await page.find('cat-skeleton');
    expect(element).toHaveClass('hydrated');
  });
});

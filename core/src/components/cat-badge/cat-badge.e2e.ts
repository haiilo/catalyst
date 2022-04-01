import { newE2EPage } from '@stencil/core/testing';

describe('cat-badge', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-badge></cat-badge>');

    const element = await page.find('cat-badge');
    expect(element).toHaveClass('hydrated');
  });
});

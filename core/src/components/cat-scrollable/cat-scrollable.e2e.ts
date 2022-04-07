import { newE2EPage } from '@stencil/core/testing';

describe('cat-scrollable', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-scrollable></cat-scrollable>');

    const element = await page.find('cat-scrollable');
    expect(element).toHaveClass('hydrated');
  });
});

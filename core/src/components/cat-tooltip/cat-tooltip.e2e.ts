import { newE2EPage } from '@stencil/core/testing';

describe('cat-tooltip', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-tooltip></cat-tooltip>');

    const element = await page.find('cat-tooltip');
    expect(element).toHaveClass('hydrated');
  });
});

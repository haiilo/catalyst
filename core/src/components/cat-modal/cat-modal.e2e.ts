import { newE2EPage } from '@stencil/core/testing';

describe('cat-modal', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-modal></cat-modal>');

    const element = await page.find('cat-modal');
    expect(element).toHaveClass('hydrated');
  });
});

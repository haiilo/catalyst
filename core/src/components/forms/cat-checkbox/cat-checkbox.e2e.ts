import { newE2EPage } from '@stencil/core/testing';

describe('cat-checkbox', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-checkbox></cat-checkbox>');

    const element = await page.find('cat-checkbox');
    expect(element).toHaveClass('hydrated');
  });
});

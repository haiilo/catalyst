import { newE2EPage } from '@stencil/core/testing';

describe('cat-avatar', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-avatar label="Avatar"></cat-avatar>');

    const element = await page.find('cat-avatar');
    expect(element).toHaveClass('hydrated');
  });
});

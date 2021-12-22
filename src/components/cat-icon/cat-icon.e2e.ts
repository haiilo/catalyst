import { newE2EPage } from '@stencil/core/testing';

describe('cat-icon', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-icon></cat-icon>');

    const element = await page.find('cat-icon');
    expect(element).toHaveClass('hydrated');
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('cat-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-dropdown></cat-dropdown>');

    const element = await page.find('cat-dropdown');
    expect(element).toHaveClass('hydrated');
  });
});

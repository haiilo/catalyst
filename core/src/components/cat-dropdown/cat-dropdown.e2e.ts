import { newE2EPage } from '@stencil/core/testing';

describe('cat-dropdown', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-dropdown><button slot="trigger"></button><nav slot="content"></nav></cat-dropdown>');

    const element = await page.find('cat-dropdown');
    expect(element).toHaveClass('hydrated');
  });
});

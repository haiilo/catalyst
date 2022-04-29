import { newE2EPage } from '@stencil/core/testing';

describe('cat-toggle', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-toggle label="Label"></cat-toggle>');

    const element = await page.find('cat-toggle');
    expect(element).toHaveClass('hydrated');
  });
});

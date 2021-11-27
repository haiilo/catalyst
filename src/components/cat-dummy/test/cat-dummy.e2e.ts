import { newE2EPage } from '@stencil/core/testing';

describe('cat-dummy', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-dummy></cat-dummy>');

    const element = await page.find('cat-dummy');
    expect(element).toHaveClass('hydrated');
  });
});

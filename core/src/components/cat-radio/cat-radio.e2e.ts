import { newE2EPage } from '@stencil/core/testing';

describe('cat-radio', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-radio></cat-radio>');

    const element = await page.find('cat-radio');
    expect(element).toHaveClass('hydrated');
  });
});

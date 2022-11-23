import { newE2EPage } from '@stencil/core/testing';

describe('cat-label', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-label></cat-label>');

    const element = await page.find('cat-label');
    expect(element).toHaveClass('hydrated');
  });
});

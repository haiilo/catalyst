import { newE2EPage } from '@stencil/core/testing';

describe('cat-card', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-card></cat-card>');

    const element = await page.find('cat-card');
    expect(element).toHaveClass('hydrated');
  });
});

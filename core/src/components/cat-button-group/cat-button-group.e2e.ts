import { newE2EPage } from '@stencil/core/testing';

describe('cat-button-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-button-group></cat-button-group>');

    const element = await page.find('cat-button-group');
    expect(element).toHaveClass('hydrated');
  });
});

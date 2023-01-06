import { newE2EPage } from '@stencil/core/testing';

describe('cat-form-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-form-group></cat-form-group>');

    const element = await page.find('cat-form-group');
    expect(element).toHaveClass('hydrated');
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('cat-radio-group', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-radio-group></cat-radio-group>');

    const element = await page.find('cat-radio-group');
    expect(element).toHaveClass('hydrated');
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('cat-test', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-test></cat-test>');

    const element = await page.find('cat-test');
    expect(element).toHaveClass('hydrated');
  });
});

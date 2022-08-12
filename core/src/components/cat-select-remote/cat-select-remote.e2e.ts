import { newE2EPage } from '@stencil/core/testing';

describe('cat-select-remote', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-select-remote></cat-select-remote>');

    const element = await page.find('cat-select-remote');
    expect(element).toHaveClass('hydrated');
  });
});

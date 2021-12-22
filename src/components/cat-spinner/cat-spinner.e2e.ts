import { newE2EPage } from '@stencil/core/testing';

describe('cat-spinner', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-spinner></cat-spinner>');

    const element = await page.find('cat-spinner');
    expect(element).toHaveClass('hydrated');
  });
});

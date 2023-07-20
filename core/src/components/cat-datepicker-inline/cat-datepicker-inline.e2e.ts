import { newE2EPage } from '@stencil/core/testing';

describe('cat-datepicker-inline', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-datepicker-inline></cat-datepicker-inline>');

    const element = await page.find('cat-datepicker-inline');
    expect(element).toHaveClass('hydrated');
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('cat-datepicker-flat', () => {
  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-datepicker-flat></cat-datepicker-flat>');

    const element = await page.find('cat-datepicker-flat');
    expect(element).toHaveClass('hydrated');
  });
});

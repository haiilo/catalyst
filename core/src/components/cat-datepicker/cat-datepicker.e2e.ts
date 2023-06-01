import { newE2EPage } from '@stencil/core/testing';

describe('cat-datepicker', () => {
  beforeAll(() => (console.error = jest.fn()));

  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-datepicker label="Label"=></cat-datepicker>');

    const element = await page.find('cat-datepicker');
    expect(element).toHaveClass('hydrated');
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('cat-timepicker', () => {
  beforeAll(() => (console.error = jest.fn()));

  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-timepicker label="Label"></cat-timepicker>');

    const element = await page.find('cat-timepicker');
    expect(element).toHaveClass('hydrated');
  });
});

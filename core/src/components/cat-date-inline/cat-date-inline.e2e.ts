import { newE2EPage } from '@stencil/core/testing';

describe('cat-date-inline', () => {
  beforeAll(() => (console.error = jest.fn()));

  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-date-inline></cat-date-inline>');

    const element = await page.find('cat-date-inline');
    expect(element).toHaveClass('hydrated');
  });
});

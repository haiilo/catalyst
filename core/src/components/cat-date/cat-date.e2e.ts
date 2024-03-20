import { newE2EPage } from '@stencil/core/testing';

describe('cat-date', () => {
  beforeAll(() => (console.error = jest.fn()));

  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-date></cat-date>');

    const element = await page.find('cat-date');
    expect(element).toHaveClass('hydrated');
  });
});

import { newE2EPage } from '@stencil/core/testing';

describe('cat-pagination', () => {
  beforeAll(() => {
    console.error = jest.fn();
    console.warn = jest.fn();
  });

  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-pagination></cat-pagination>');

    const element = await page.find('cat-pagination');
    expect(element).toHaveClass('hydrated');
  });
});

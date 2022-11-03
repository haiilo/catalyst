import { newE2EPage } from '@stencil/core/testing';

describe('cat-select', () => {
  beforeAll(() => {
    console.error = jest.fn();
    console.warn = jest.fn();
  });

  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-select label="Label"></cat-select>');

    const element = await page.find('cat-select');
    expect(element).toHaveClass('hydrated');
  });
});

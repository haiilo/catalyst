import { newE2EPage } from '@stencil/core/testing';

describe('cat-tag', () => {
  beforeAll(() => {
    console.error = jest.fn();
    console.warn = jest.fn();
  });

  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-tag label="Label"></cat-tag>');

    const element = await page.find('cat-tag');
    expect(element).toHaveClass('hydrated');
  });
});

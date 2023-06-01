import { newE2EPage } from '@stencil/core/testing';

describe('cat-textarea', () => {
  beforeAll(() => (console.error = jest.fn()));

  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-textarea label="Label"></cat-textarea>');

    const element = await page.find('cat-textarea');
    expect(element).toHaveClass('hydrated');
  });
});

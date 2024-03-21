import { newE2EPage } from '@stencil/core/testing';

describe('cat-time', () => {
  beforeAll(() => (console.error = jest.fn()));

  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-time></cat-time>');

    const element = await page.find('cat-time');
    expect(element).toHaveClass('hydrated');
  });
});

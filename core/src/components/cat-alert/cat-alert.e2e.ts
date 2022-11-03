import { newE2EPage } from '@stencil/core/testing';

describe('cat-alert', () => {
  beforeAll(() => (console.error = jest.fn()));

  it('renders', async () => {
    const page = await newE2EPage();
    await page.setContent('<cat-alert></cat-alert>');

    const element = await page.find('cat-alert');
    expect(element).toHaveClass('hydrated');
  });
});

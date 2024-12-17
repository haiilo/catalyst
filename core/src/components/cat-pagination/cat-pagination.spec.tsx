jest.mock('../cat-i18n/cat-i18n-registry');
import { newSpecPage } from '@stencil/core/testing';
import { CatPagination } from './cat-pagination';

describe('cat-pagination', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatPagination],
      html: `<cat-pagination></cat-pagination>`
    });
    expect(page.root).toEqualLightHtml(`
      <cat-pagination tabindex="0"></cat-pagination>
    `);
  });
});

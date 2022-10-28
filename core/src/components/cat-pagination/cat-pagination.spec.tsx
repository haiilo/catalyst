import { newSpecPage } from '@stencil/core/testing';
import { CatPagination } from './cat-pagination';

describe('cat-pagination', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatPagination],
      html: `<cat-pagination></cat-pagination>`
    });
    expect(page.root).toEqualHtml(`
      <cat-pagination>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cat-pagination>
    `);
  });
});

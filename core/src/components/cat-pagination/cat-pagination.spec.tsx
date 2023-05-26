jest.mock('../cat-i18n/cat-i18n-registry');
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
          <nav role="navigation">
            <ol class="cat-pagination-m">
              <li>
                <cat-button a11ylabel="pagination.prev" disabled="" icon="$cat:pagination-left" icononly="" size="m" variant="text"></cat-button>
              </li>
              <li>
                <cat-button a11ycurrent="step" a11ylabel="pagination.page" active="" color="primary" size="m" variant="text">1</cat-button>
              </li>
              <li>
                 <cat-button a11ylabel="pagination.next" disabled="" icon="$cat:pagination-right" icononly="" size="m" variant="text"></cat-button>
              </li>
            </ol>
          </nav>
        </mock:shadow-root>
      </cat-pagination>
    `);
  });
});

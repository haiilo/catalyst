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
      <cat-pagination size="m" variant="text">
        <mock:shadow-root>
          <nav role="navigation">
            <ol class="cat-pagination-m">
              <li>
              <cat-button a11ylabel="pagination.prev" disabled="" icononly="" iconsrc="<svg viewBox=&quot;0 0 24 24&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><path fill-rule=&quot;evenodd&quot; clip-rule=&quot;evenodd&quot; d=&quot;M14.53 6.47a.75.75 0 0 1 0 1.06L10.06 12l4.47 4.47a.75.75 0 1 1-1.06 1.06l-5-5a.75.75 0 0 1 0-1.06l5-5a.75.75 0 0 1 1.06 0Z&quot;/></svg>" size="m" variant="text"></cat-button>
              </li>
              <li>
                <cat-button a11ycurrent="step" a11ylabel="pagination.page" active="" color="primary" size="m" variant="text">1</cat-button>
              </li>
              <li>
              <cat-button a11ylabel="pagination.next" disabled="" icononly="" iconsrc="<svg viewBox=&quot;0 0 24 24&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;><path fill-rule=&quot;evenodd&quot; clip-rule=&quot;evenodd&quot; d=&quot;M9.47 6.47a.75.75 0 0 1 1.06 0l5 5a.75.75 0 0 1 0 1.06l-5 5a.75.75 0 1 1-1.06-1.06L13.94 12 9.47 7.53a.75.75 0 0 1 0-1.06Z&quot;/></svg>" size="m" variant="text"></cat-button>
              </li>
            </ol>
          </nav>
        </mock:shadow-root>
      </cat-pagination>
    `);
  });
});

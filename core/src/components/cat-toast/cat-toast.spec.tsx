import { newSpecPage } from '@stencil/core/testing';
import { CatToast } from './cat-toast';

describe('cat-toast', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatToast],
      html: `<cat-toast></cat-toast>`
    });
    expect(page.root).toEqualHtml(`
      <cat-toast>
        <mock:shadow-root>
          <button>
            show toast
          </button>
        </mock:shadow-root>
      </cat-toast>
    `);
  });
});

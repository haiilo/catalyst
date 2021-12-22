import { newSpecPage } from '@stencil/core/testing';
import { CatButton } from './cat-button';

describe('cat-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatButton],
      html: `<cat-button></cat-button>`
    });
    expect(page.root).toEqualHtml(`
      <cat-button>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cat-button>
    `);
  });
});

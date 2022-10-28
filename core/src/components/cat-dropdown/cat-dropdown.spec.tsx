import { newSpecPage } from '@stencil/core/testing';
import { CatDropdown } from './cat-dropdown';

describe.skip('cat-dropdown', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatDropdown],
      html: `<cat-dropdown>
        <button slot="trigger"></button>
        <nav slot="content"></nav>
      </cat-dropdown>`
    });
    expect(page.root).toEqualHtml(`
      <cat-dropdown>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cat-dropdown>
    `);
  });
});

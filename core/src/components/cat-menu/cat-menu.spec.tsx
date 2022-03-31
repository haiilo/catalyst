import { newSpecPage } from '@stencil/core/testing';
import { CatMenu } from './cat-menu';

describe('cat-menu', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatMenu],
      html: `<cat-menu>
        <button slot="trigger"></button>
        <nav slot="content"></nav>
      </cat-menu>`
    });
    expect(page.root).toEqualHtml(`
      <cat-menu>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cat-menu>
    `);
  });
});

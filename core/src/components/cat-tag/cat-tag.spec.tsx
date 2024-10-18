import { newSpecPage } from '@stencil/core/testing';
import { CatTag } from './cat-tag';

describe('cat-tag', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatTag],
      html: `<cat-tag></cat-tag>`,
    });
    expect(page.root).toEqualHtml(`
      <cat-tag>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cat-tag>
    `);
  });
});

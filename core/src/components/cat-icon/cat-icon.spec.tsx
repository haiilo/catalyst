import { newSpecPage } from '@stencil/core/testing';
import { CatIcon } from './cat-icon';

describe('cat-icon', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatIcon],
      html: `<cat-icon></cat-icon>`
    });
    expect(page.root).toEqualHtml(`
      <cat-icon>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cat-icon>
    `);
  });
});

import { newSpecPage } from '@stencil/core/testing';
import { CatDummy } from '../cat-dummy';

describe('cat-dummy', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatDummy],
      html: `<cat-dummy></cat-dummy>`,
    });
    expect(page.root).toEqualHtml(`
      <cat-dummy>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cat-dummy>
    `);
  });
});

import { newSpecPage } from '@stencil/core/testing';
import { CatModal } from './cat-modal';

describe('cat-modal', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatModal],
      html: `<cat-modal></cat-modal>`,
    });
    expect(page.root).toEqualHtml(`
      <cat-modal>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cat-modal>
    `);
  });
});

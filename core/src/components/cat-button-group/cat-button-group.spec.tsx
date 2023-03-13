import { newSpecPage } from '@stencil/core/testing';
import { CatButtonGroup } from './cat-button-group';

describe('cat-button-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatButtonGroup],
      html: `<cat-button-group></cat-button-group>`
    });
    expect(page.root).toEqualHtml(`
      <cat-button-group role="group">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cat-button-group>
    `);
  });
});

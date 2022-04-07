import { newSpecPage } from '@stencil/core/testing';
import { CatTooltip } from './cat-tooltip';

describe.skip('cat-tooltip', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatTooltip],
      html: `<cat-tooltip content="tooltip">hover me</cat-tooltip>`,
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

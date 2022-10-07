import { newSpecPage } from '@stencil/core/testing';
import { CatBadge } from './cat-badge';

describe('cat-badge', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatBadge],
      html: `<cat-badge></cat-badge>`
    });
    expect(page.root).toEqualHtml(`
      <cat-badge color="primary" size="m" variant="filled">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cat-badge>
    `);
  });
});

import { newSpecPage } from '@stencil/core/testing';
import { CatBadge } from './cat-badge';

describe('cat-badge', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatBadge],
      html: `<cat-badge></cat-badge>`
    });
    expect(page.root).toEqualHtml(`
      <cat-badge>
        <mock:shadow-root>
          <span class="badge badge-filled badge-m badge-primary" part="badge">
            <slot></slot>
          </span>
        </mock:shadow-root>
      </cat-badge>
    `);
  });
});

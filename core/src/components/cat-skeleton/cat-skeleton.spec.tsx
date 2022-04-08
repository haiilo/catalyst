import { newSpecPage } from '@stencil/core/testing';
import { CatSkeleton } from './cat-skeleton';

describe('cat-skeleton', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatSkeleton],
      html: `<cat-skeleton></cat-skeleton>`
    });
    expect(page.root).toEqualHtml(`
      <cat-skeleton>
        <mock:shadow-root>
          <div class="cat-skeleton cat-skeleton-m cat-skeleton-rectangle cat-skeleton-sheen"></div>
        </mock:shadow-root>
      </cat-skeleton>
    `);
  });
});

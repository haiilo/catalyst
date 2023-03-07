import { newSpecPage } from '@stencil/core/testing';
import { CatSkeleton } from './cat-skeleton';

describe('cat-skeleton', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatSkeleton],
      html: `<cat-skeleton></cat-skeleton>`
    });
    expect(page.root).toEqualHtml(`
      <cat-skeleton size="m" variant="rectangle">
        <mock:shadow-root>
          <div class="skeleton skeleton-m skeleton-rectangle skeleton-sheen"></div>
        </mock:shadow-root>
      </cat-skeleton>
    `);
  });
});

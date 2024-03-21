import { newSpecPage } from '@stencil/core/testing';
import { CatBadge } from './cat-badge';

describe('cat-badge', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatBadge],
      html: `<cat-badge></cat-badge>`
    });
    expect(page.root).toEqualLightHtml(`
      <cat-badge color="primary" size="m" variant="filled"></cat-badge>
    `);
  });
});

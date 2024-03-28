import { newSpecPage } from '@stencil/core/testing';
import { CatCard } from './cat-card';

describe('cat-card', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatCard],
      html: `<cat-card></cat-card>`
    });
    expect(page.root).toEqualLightHtml(`
      <cat-card></cat-card>
    `);
  });
});

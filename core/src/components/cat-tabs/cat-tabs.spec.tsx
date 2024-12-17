import { newSpecPage } from '@stencil/core/testing';
import { CatTabs } from './cat-tabs';

describe('cat-tabs', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatTabs],
      html: `<cat-tabs></cat-tabs>`
    });
    expect(page.root).toEqualLightHtml(`
      <cat-tabs tabindex="0"></cat-tabs>
    `);
  });
});

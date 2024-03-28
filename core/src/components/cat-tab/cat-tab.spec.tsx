import { newSpecPage } from '@stencil/core/testing';
import { CatTab } from './cat-tab';

describe('cat-tab', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatTab],
      html: `<cat-tab></cat-tab>`
    });
    expect(page.root).toEqualLightHtml(`
      <cat-tab id="cat-tab-0" label=""></cat-tab>
    `);
  });
});

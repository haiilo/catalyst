import { newSpecPage } from '@stencil/core/testing';
import { CatTab } from './cat-tab';

describe('cat-tab', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatTab],
      html: `<cat-tab></cat-tab>`
    });
    expect(page.root).toEqualHtml(`
      <cat-tab>
        <mock:shadow-root>
          <cat-button color="secondary" variant="text"></cat-button>
        </mock:shadow-root>
      </cat-tab>
    `);
  });
});

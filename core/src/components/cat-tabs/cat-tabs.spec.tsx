import { newSpecPage } from '@stencil/core/testing';
import { CatTabs } from './cat-tabs';

global.MutationObserver = jest.fn(() => {
  return {
    observe: jest.fn()
  };
});

describe('cat-tabs', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatTabs],
      html: `<cat-tabs></cat-tabs>`
    });
    expect(page.root).toEqualHtml(`
      <cat-tabs active-tab="" tabs-align="left">
        <mock:shadow-root>
        </mock:shadow-root>
      </cat-tabs>
    `);
  });
});

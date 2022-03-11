import { newSpecPage } from '@stencil/core/testing';
import { CatButton } from './cat-button';

describe('cat-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatButton],
      html: `<cat-button>Hello World</cat-button>`
    });
    expect(page.root?.shadowRoot).toEqualHtml(`
          <button class="cat-button cat-button-ellipsed cat-button-filled cat-button-m cat-button-primary" part="button" type="button">
            <span class="cat-button-content" part="content">
              <slot></slot>
            </span>
          </button>
    `);
  });
});

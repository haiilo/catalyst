import { newSpecPage } from '@stencil/core/testing';
import { CatButton } from './cat-button';

describe('cat-button', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatButton],
      html: `<cat-button></cat-button>`
    });
    expect(page.root?.shadowRoot).toEqualLightHtml(`
          <button class="cat-button cat-button-ellipsed cat-button-outlined cat-button-m cat-button-secondary" part="button" type="button">
            <span class="cat-button-content" part="content">
              <span class="cat-button-content-inner">
                <slot></slot>
              </span>
            </span>
          </button>
    `);
  });
});

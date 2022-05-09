import { newSpecPage } from '@stencil/core/testing';
import { CatModal } from './cat-modal';

describe('cat-modal', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatModal],
      html: `<cat-modal></cat-modal>`
    });
    expect(page.root).toEqualHtml(`
      <cat-modal>
        <mock:shadow-root>
           <div class="wrapper">
              <div class="modal modal-m" role="modal">
                <div class="header">
                   <cat-button class="close-button" icon="cross-outlined" size="s"></cat-button>
                </div>
                <div class="content">
                    <slot></slot>
                </div>
              </div>
           </div>
        </mock:shadow-root>
      </cat-modal>
    `);
  });
});

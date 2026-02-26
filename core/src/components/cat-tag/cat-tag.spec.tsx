import { newSpecPage } from '@stencil/core/testing';
import { CatTag } from './cat-tag';

describe('cat-tag', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatTag],
      html: `<cat-tag></cat-tag>`
    });
    expect(page.root?.shadowRoot).toEqualHtml(`
       <div class="label-container"></div>
       <div class="input-wrapper">
        <div class="input-inner-wrapper">
         <input aria-controls="tags-cat-input-0-list" class="tags-input" id="tags-cat-input-0-input" part="input" role="combobox">
        </div>
       </div>
    `);
  });
});

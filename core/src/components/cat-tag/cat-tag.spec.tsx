import { newSpecPage } from '@stencil/core/testing';
import { CatTag } from './cat-tag';

describe('cat-tag', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatTag],
      html: `<cat-tag></cat-tag>`
    });
    expect(page.root).toEqualHtml(`
        <cat-tag>
         <mock:shadow-root>
           <div class="label-container"></div>
           <div class="input-wrapper">
             <input class="tags-input" id="tags-cat-input-0-input" part="input" role="combobox">
           </div>
         </mock:shadow-root>
        </cat-tag>
    `);
  });
});

import { newSpecPage } from '@stencil/core/testing';
import { CatSelect } from './cat-select';

describe('cat-select', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatSelect],
      html: `<cat-select></cat-select>`
    });
    expect(page.root).toEqualHtml(`
      <cat-select>
        <mock:shadow-root>
          <div aria-controls="select-listbox-cat-input-0" class="select-wrapper" id="cat-input-0" role="combobox">
           <div class="select-wrapper-inner">
             <input aria-controls="select-listbox-cat-input-0" class="select-input" value="">
           </div>
           <cat-button a11ylabel="" aria-controls="select-listbox-cat-input-0" class="select-btn" icon="chevron-down-outlined" icononly="" size="s" tabindex="-1" variant="text"></cat-button>
         </div>
         <div class="select-dropdown"></div>
        </mock:shadow-root>
      </cat-select>
    `);
  });
});

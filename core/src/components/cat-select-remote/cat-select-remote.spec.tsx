import { newSpecPage } from '@stencil/core/testing';
import { CatSelectRemote } from './cat-select-remote';

describe('cat-select-remote', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatSelectRemote],
      html: `<cat-select-remote></cat-select-remote>`
    });
    expect(page.root).toEqualHtml(`
      <cat-select-remote>
        <mock:shadow-root>
          <div aria-controls="listbox-1" class="select-wrapper" role="combobox">
           <div class="select-wrapper-inner">
             <input class="select-input">
           </div>
           <cat-button a11ylabel="" class="select-btn" icon="chevron-down-outlined" icononly="" round="" size="s" tabindex="-1" variant="text"></cat-button>
         </div>
         <div class="select-dropdown" id="listbox-1" role="listbox"></div>
        </mock:shadow-root>
      </cat-select-remote>
    `);
  });
});

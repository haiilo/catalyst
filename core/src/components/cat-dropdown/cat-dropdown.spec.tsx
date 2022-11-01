jest.mock('../cat-icon/cat-icon-registry.ts');
import { newSpecPage } from '@stencil/core/testing';
import { CatDropdown } from './cat-dropdown';

describe('cat-dropdown', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatDropdown],
      html: `<cat-dropdown>
        <button slot="trigger"></button>
        <nav slot="content"></nav>
      </cat-dropdown>`
    });
    expect(page.root).toEqualHtml(`
     <cat-dropdown>
        <mock:shadow-root>
         <slot name="trigger"></slot>
         <div class="content overflow-auto" id="cat-dropdown-0">
           <slot name="content"></slot>
         </div>
       </mock:shadow-root>
       <button slot="trigger"></button>
       <nav slot="content"></nav>
      </cat-dropdown>
    `);
  });
});

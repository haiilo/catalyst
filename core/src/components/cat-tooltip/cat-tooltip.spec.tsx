import { newSpecPage } from '@stencil/core/testing';
import { CatTooltip } from './cat-tooltip';

describe('cat-tooltip', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatTooltip],
      html: `<cat-tooltip content="tooltip">hover me</cat-tooltip>`
    });
    expect(page.root).toEqualHtml(`
       <cat-tooltip content="tooltip">
       <mock:shadow-root>
         <div class="tooltip-content">
           <slot></slot>
         </div>
         <div aria-describedby="tooltip" class="tooltip">
          tooltip
         </div>
       </mock:shadow-root>
       hover me
     </cat-tooltip>
    `);
  });
});

import { newSpecPage } from '@stencil/core/testing';
import { CatScrollable } from './cat-scrollable';

describe('cat-scrollable', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatScrollable],
      html: `<cat-scrollable></cat-scrollable>`
    });
    expect(page.root).toEqualHtml(`
      <cat-scrollable class="scroll-x scroll-y">
       <mock:shadow-root>
         <div class='shadow-wrapper'>
           <div class='shadow-top'></div>
           <div class='shadow-left'></div>
           <div class='shadow-right'></div>
           <div class='shadow-bottom'></div>
         </div>
         <div class='scrollable-content'>
           <slot></slot>
      </cat-scrollable>
    `);
  });
});

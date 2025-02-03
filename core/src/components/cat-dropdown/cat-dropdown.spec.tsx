jest.mock('../../utils/first-tabbable', () => (element: HTMLSlotElement) => element);

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
    expect(page.root).toEqualLightHtml(`
     <cat-dropdown>
       <button slot="trigger"></button>
       <nav slot="content"></nav>
     </cat-dropdown>
    `);
  });
});

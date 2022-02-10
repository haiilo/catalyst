import { newSpecPage } from '@stencil/core/testing';
import { CatIcon } from './cat-icon';
import { CatIconRegistry } from './cat-icon-registry';

describe('cat-icon', () => {
  beforeAll(() => {
    CatIconRegistry.getInstance = jest.fn().mockReturnValue({
      getIcon: () => '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M0 0 L24 12 L0 24 Z"></path></svg>'
    });
  });

  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatIcon],
      html: `<cat-icon></cat-icon>`
    });
    expect(page.root).toEqualHtml(`
      <cat-icon>
        <mock:shadow-root>
          <span aria-hidden="true" class="cat-icon-m" part="icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
              <path d="M0 0 L24 12 L0 24 Z"></path>
            </svg>
          </span>
        </mock:shadow-root>
      </cat-icon>
    `);
  });
});

import { newSpecPage } from '@stencil/core/testing';
import { CatIcon } from './cat-icon';
import { CatIconRegistry } from './cat-icon-registry';

jest.mock('./cat-icon-registry')

describe('cat-icon', () => {
  it('renders', async () => {
    CatIconRegistry.getInstance = jest.fn().mockReturnValue({
      getIcon: () => 'ssfd'
    });
    const page = await newSpecPage({
      components: [CatIcon],
      html: `<cat-icon></cat-icon>`
    });
    expect(page.root).toEqualHtml(`
      <cat-icon>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cat-icon>
    `);
  });
});

import { newSpecPage } from '@stencil/core/testing';
import { CatCheckbox } from './cat-checkbox';

describe('cat-checkbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatCheckbox],
      html: `<cat-checkbox></cat-checkbox>`,
    });
    expect(page.root).toEqualHtml(`
      <cat-checkbox>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cat-checkbox>
    `);
  });
});

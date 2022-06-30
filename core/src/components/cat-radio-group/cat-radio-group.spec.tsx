import { newSpecPage } from '@stencil/core/testing';
import { CatRadioGroup } from './cat-radio-group';

describe('cat-radio-group', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatRadioGroup],
      html: `<cat-radio-group></cat-radio-group>`
    });
    expect(page.root).toEqualHtml(`
      <cat-radio-group role="radiogroup">
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cat-radio-group>
    `);
  });
});

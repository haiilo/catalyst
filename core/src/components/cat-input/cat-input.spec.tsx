import { newSpecPage } from '@stencil/core/testing';
import { CatInput } from '../cat-input';

describe('cat-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatInput],
      html: `<cat-input></cat-input>`,
    });
    expect(page.root).toEqualHtml(`
      <cat-input>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cat-input>
    `);
  });
});

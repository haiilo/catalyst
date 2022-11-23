import { newSpecPage } from '@stencil/core/testing';
import { CatLabel } from './cat-label';

describe('cat-label', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatLabel],
      html: `<cat-label></cat-label>`
    });
    expect(page.root).toEqualHtml(`
      <cat-label>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cat-label>
    `);
  });
});

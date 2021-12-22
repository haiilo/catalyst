import { newSpecPage } from '@stencil/core/testing';
import { CatSpinner } from './cat-spinner';

describe('cat-spinner', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatSpinner],
      html: `<cat-spinner></cat-spinner>`
    });
    expect(page.root).toEqualHtml(`
      <cat-spinner>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cat-spinner>
    `);
  });
});

import { newSpecPage } from '@stencil/core/testing';
import { CatDate } from './cat-date';

describe('cat-date', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatDate],
      html: `<cat-date></cat-date>`,
    });
    expect(page.root).toEqualHtml(`
      <cat-date>
        <mock:shadow-root>
          <slot></slot>
        </mock:shadow-root>
      </cat-date>
    `);
  });
});

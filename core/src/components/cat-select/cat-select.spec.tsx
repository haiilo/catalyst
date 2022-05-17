import { newSpecPage } from '@stencil/core/testing';
import { CatSelect } from './cat-select';

describe('cat-select', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatSelect],
      html: `<cat-select></cat-select>`
    });
    expect(page.root).toEqualHtml(`
      <cat-select>
        <mock:shadow-root>
          <select></select>
        </mock:shadow-root>
      </cat-select>
    `);
  });
});

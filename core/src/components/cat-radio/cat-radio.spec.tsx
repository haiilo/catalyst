import { newSpecPage } from '@stencil/core/testing';
import { CatRadio } from './cat-radio';

describe('cat-radio', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatRadio],
      html: `<cat-radio></cat-radio>`
    });
    expect(page.root).toEqualHtml(`
      <cat-radio>
        <mock:shadow-root>
          <label>
            <input type="radio">
          </label>
        </mock:shadow-root>
      </cat-radio>
    `);
  });
});

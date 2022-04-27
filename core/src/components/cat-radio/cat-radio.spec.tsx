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
          <div class="cat-radio-wrapper">
            <input class="cat-radio-input" part="radio" type="radio">
            <i></i>
            <label class="cat-radio-label" part="label"></label>
          </div>
        </mock:shadow-root>
      </cat-radio>
    `);
  });
});

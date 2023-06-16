import { newSpecPage } from '@stencil/core/testing';
import { CatRadio } from './cat-radio';

describe('cat-radio', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatRadio],
      html: `<cat-radio label="Label" value="value"></cat-radio>`
    });
    expect(page.root).toEqualHtml(`
      <cat-radio label="Label" value="value">
        <mock:shadow-root>
          <label aria-checked="false" htmlfor="cat-radio-1" role="radio">
            <span class="radio">
              <input id="cat-radio-1" type="radio" value="value">
              <span class="circle"></span>
            </span>
            <span class="label" part="label">Label</span>
          </label>
        </mock:shadow-root>
      </cat-radio>
    `);
  });
});

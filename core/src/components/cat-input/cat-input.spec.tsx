import { newSpecPage } from '@stencil/core/testing';
import { CatInput } from './cat-input';

describe('cat-input', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatInput],
      html: `<cat-input label="Label"></cat-input>`
    });
    expect(page.root).toEqualHtml(`
      <cat-input label="Label">
        <mock:shadow-root>
          <label htmlfor="cat-input-0">
            <span part="label">Label <span aria-hidden="true" class="input-optional">(Optional)</span></span>
          </label>
          <div class="input-wrapper">
            <div class="input-inner-wrapper">
              <input id="cat-input-0" type="text" value="">
            </div>
          </div>
        </mock:shadow-root>
      </cat-input>
    `);
  });
});

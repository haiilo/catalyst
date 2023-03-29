import { newSpecPage } from '@stencil/core/testing';
import { CatDatepicker } from './cat-datepicker';

describe('cat-datepicker', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatDatepicker],
      html: `<cat-datepicker label="Label"></cat-datepicker>`
    });
    expect(page.root).toEqualHtml(`
      <cat-datepicker>
        <mock:shadow-root>
          <div class="input-field">
            <div class="label-container">
              <label htmlfor="cat-input-0">
                <span class="label-wrapper" part="label">Label 
                  <div class="label-metadata">
                    <span aria-hidden="true" class="label-optional">(input.optional)</span>
                  </div>
                </span>
              </label>
            </div>
            <div class="input-container">
              <div class="input-wrapper">
                <div class="input-inner-wrapper">
                  <input id="cat-input-0" type="text" class="datepicker-input">
                </div>
              </div>
            </div>
          </div>
        </mock:shadow-root>
      </cat-datepicker>
    `);
  });
});

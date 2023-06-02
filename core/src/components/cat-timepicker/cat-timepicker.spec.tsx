jest.mock('../cat-i18n/cat-i18n-registry');

import { newSpecPage } from '@stencil/core/testing';
import { CatTimepicker } from '../cat-timepicker/cat-timepicker';
import { CatSelect } from '../cat-select/cat-select';

describe('cat-timepicker', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatTimepicker, CatSelect],
      html: `<cat-timepicker label="Label"></cat-timepicker>`
    });
    expect(page.root).toEqualHtml(`
      <cat-timepicker label="Label">
        <mock:shadow-root>
          <cat-select>
            <mock:shadow-root>
              <div class="select-field">
                <div class="label-container">
                  <label htmlfor="cat-input-0">
                    <span class="label-wrapper" part="label">
                      Label
                      <div class="label-metadata">
                        <span aria-hidden="true" class="label-optional">
                          (input.optional)
                        </span>
                      </div>
                    </span>
                  </label>
                </div>
                <div class="select-container">
                  <div aria-controls="select-listbox-cat-input-0" class="select-wrapper" id="cat-input-0" role="combobox">
                    <div class="select-wrapper-inner">
                      <input aria-controls="select-listbox-cat-input-0" class="select-input" value="">
                    </div>
                    <cat-button a11ylabel="select.open" aria-controls="select-listbox-cat-input-0" class="select-btn" icon="$cat:select-open" icononly="" size="s" tabindex="-1" variant="text"></cat-button>
                  </div>
                </div>
              </div>
              <div class="select-dropdown"></div>
            </mock:shadow-root>
          </cat-select>
        </mock:shadow-root>
      </cat-timepicker>
    `);
  });
});

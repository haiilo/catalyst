jest.mock('../cat-i18n/cat-i18n-registry');

import { newSpecPage } from '@stencil/core/testing';
import { CatDatepicker } from './cat-datepicker';
import { CatInput } from '../cat-input/cat-input';

describe('cat-datepicker', () => {
  it('renders', async () => {
    expect(true).toBeTruthy();
    const page = await newSpecPage({
      components: [CatDatepicker, CatInput],
      html: `<cat-datepicker label="Label"></cat-datepicker>`
    });
    expect(page.root).toEqualHtml(`
      <cat-datepicker label="Label">
        <mock:shadow-root>
          <cat-input>
            <mock:shadow-root>
              <div class="input-field">
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
                <div class="input-container">
                  <div class="input-wrapper">
                    <div class="input-inner-wrapper">
                      <input id="cat-input-0" type="text">
                   </div>
                 </div>
                </div>
              </div>
            </mock:shadow-root>
          </cat-input>
        </mock:shadow-root>
      </cat-datepicker>
    `);
  });
});

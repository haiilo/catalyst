jest.mock('../cat-i18n/cat-i18n-registry');

import { newSpecPage } from '@stencil/core/testing';
import { CatSelect } from './cat-select';

describe('cat-select', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatSelect],
      html: `<cat-select label="Label"></cat-select>`
    });
    expect(page.root).toEqualHtml(`
      <cat-select label="Label">
        <mock:shadow-root>
            <label htmlfor="cat-select-0">
              <span part="label">
                Label
                <span aria-hidden="true" class="input-optional">
                  (input.optional)
                </span>
              </span>
            </label>
            <select id="cat-select-0"></select>
        </mock:shadow-root>
      </cat-select>
    `);
  });
});

jest.mock('../cat-i18n/cat-i18n-registry');

import { newSpecPage } from '@stencil/core/testing';
import { CatDatepickerFlat } from './cat-datepicker';

describe('cat-datepicker', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatDatepickerFlat],
      html: `<cat-datepicker label="Label"></cat-datepicker>`
    });
    expect(page.root).toEqualHtml(`
      <cat-datepicker label="Label">
        <mock:shadow-root>
          <cat-input errorupdate="0" label="Label" requiredmarker="optional"></cat-input>
          <div class="datepicker-wrapper"></div>
        </mock:shadow-root>
      </cat-datepicker>
    `);
  });
});

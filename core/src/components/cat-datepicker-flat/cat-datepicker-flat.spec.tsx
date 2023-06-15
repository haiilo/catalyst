jest.mock('../cat-i18n/cat-i18n-registry');

import { newSpecPage } from '@stencil/core/testing';
import { CatDatepickerFlat } from './cat-datepicker-flat';

describe('cat-datepicker-flat', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatDatepickerFlat],
      html: `<cat-datepicker-flat label="Label"></cat-datepicker-flat>`
    });
    expect(page.root).toEqualHtml(`
      <cat-datepicker-flat label="Label">
        <mock:shadow-root>
          <cat-input errorupdate="0" label="Label" requiredmarker="optional"></cat-input>
        </mock:shadow-root>
      </cat-datepicker-flat>
    `);
  });
});

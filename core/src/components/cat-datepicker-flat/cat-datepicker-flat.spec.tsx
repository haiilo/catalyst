import { newSpecPage } from '@stencil/core/testing';
import { CatDatepickerFlat } from './cat-datepicker-flat';

describe('cat-datepicker-flat', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatDatepickerFlat],
      html: `<cat-datepicker-flat></cat-datepicker-flat>`
    });
    expect(page.root).toEqualHtml(`
      <cat-datepicker-flat>
        <mock:shadow-root>
          <cat-input errorupdate="0" label="" requiredmarker="optional"></cat-input>
        </mock:shadow-root>
      </cat-datepicker-flat>
    `);
  });
});

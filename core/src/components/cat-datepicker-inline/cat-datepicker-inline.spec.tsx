import { newSpecPage } from '@stencil/core/testing';
import { CatDatepickerInline } from './cat-datepicker-inline';

describe('cat-datepicker-inline', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatDatepickerInline],
      html: `<cat-datepicker-inline></cat-datepicker-inline>`
    });
    expect(page.root).toEqualHtml(`
      <cat-datepicker-inline>
        <mock:shadow-root>
          <div class="datepicker-wrapper">
            <input></input>
          </div>
        </mock:shadow-root>
      </cat-datepicker-inline>
    `);
  });
});

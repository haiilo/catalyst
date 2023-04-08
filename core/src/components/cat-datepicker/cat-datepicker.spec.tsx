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
          <cat-input label="Label"></cat-input>
        </mock:shadow-root>
      </cat-datepicker>
    `);
  });
});

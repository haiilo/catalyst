import { newSpecPage } from '@stencil/core/testing';
import { CatCheckbox } from './cat-checkbox';

describe('cat-checkbox', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatCheckbox],
      html: `<cat-checkbox></cat-checkbox>`
    });
    expect(page.root).toEqualHtml(`
     <cat-checkbox>
        <mock:shadow-root>
         <div class="form-check">
           <input class="form-check-input" id="cat-checkbox-0" type="checkbox">
           <label class="form-check-label" htmlFor="cat-checkbox-0"></label>
        </div>
        </mock:shadow-root>
      </cat-checkbox>
    `);
  });
});

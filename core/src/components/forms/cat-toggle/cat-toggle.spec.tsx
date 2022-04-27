import { newSpecPage } from '@stencil/core/testing';
import { CatToggle } from './cat-toggle';

describe('cat-toggle', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatToggle],
      html: `<cat-toggle></cat-toggle>`
    });
    expect(page.root).toEqualHtml(`
      <cat-toggle>
        <mock:shadow-root>
          <div class="form-check form-switch">
           <input class="form-check-input" id="cat-toggle-0" role="switch" type="checkbox">
           <label class="form-check-label" htmlfor="cat-toggle-0"></label>
        </div>
        </mock:shadow-root>
      </cat-toggle>
    `);
  });
});

import { newSpecPage } from '@stencil/core/testing';
import { CatToggle } from './cat-toggle';

describe('cat-toggle', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatToggle],
      html: `<cat-toggle label="Label"></cat-toggle>`
    });
    expect(page.root).toEqualHtml(`
      <cat-toggle label="Label">
        <mock:shadow-root>
          <label htmlfor="cat-toggle-0">
            <input class="form-check-input" id="cat-toggle-0" role="switch" type="checkbox">
            <span class="toggle" part="toggle"></span>
            <span class="label" part="label">Label</span>
          </label>
        </mock:shadow-root>
      </cat-toggle>
    `);
  });
});

import { newSpecPage } from '@stencil/core/testing';
import { CatTextarea } from './cat-textarea';

describe('cat-textarea', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatTextarea],
      html: `<cat-textarea label="Label"></cat-textarea>`
    });
    expect(page.root).toEqualHtml(`
      <cat-textarea label="Label">
        <mock:shadow-root>
          <label htmlfor="cat-textarea-0">
            <span part="label">Label<span aria-hidden="true" class="input-optional">(Optional)</span></span>
          </label>
          <textarea id="cat-textarea-0" rows="3"></textarea>
        </mock:shadow-root>
      </cat-textarea>
    `);
  });
});

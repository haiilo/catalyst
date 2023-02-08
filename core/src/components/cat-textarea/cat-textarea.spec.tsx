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
          <div class="textarea-field">
            <div class="label-container">
              <label htmlfor="cat-textarea-0">
                <span part="label">Label<span aria-hidden="true" class="label-optional">(input.optional)</span></span>
              </label>
            </div>
            <div class="textarea-container">
              <div class="textarea-wrapper">
                <textarea id="cat-textarea-0" rows="3"></textarea>
              </div>
            </div>
          </div>
        </mock:shadow-root>
      </cat-textarea>
    `);
  });
});

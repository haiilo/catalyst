import { newSpecPage } from '@stencil/core/testing';
import { CatLabel } from './cat-label';

describe('cat-label', () => {
  it('renders', async () => {
    const page = await newSpecPage({
      components: [CatLabel],
      html: `<cat-label></cat-label>`
    });
    expect(page.root).toEqualHtml(`
      <cat-label>
        <mock:shadow-root>
          <label>
            <span class="label-wrapper" part="label">
              <slot></slot>
              <div class="label-metadata">
                <span aria-hidden="true" class="label-optional">
                  (input.optional)
                </span>
              </div>
            </span>                        
          </label>
        </mock:shadow-root>
      </cat-label>
    `);
  });
});

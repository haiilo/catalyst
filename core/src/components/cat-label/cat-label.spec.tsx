jest.mock('../cat-i18n/cat-i18n-registry');

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
            <slot></slot>
            <span aria-hidden="true" class="input-optional">
              (input.optional)
            </span>
          </label>
        </mock:shadow-root>
      </cat-label>
    `);
  });
});

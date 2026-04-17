import { render, h, describe, it, expect } from '@stencil/vitest';
import './cat-tag';

describe('cat-tag', () => {
  it('renders', async () => {
    const { root } = await render(<cat-tag />);
    await expect(root).toEqualHtml(`
      <cat-tag tabindex="0" class="hydrated">
        <mock:shadow-root shadowrootdelegatesfocus>
          <div class="label-container"></div>
          <div class="input-wrapper">
            <div class="input-inner-wrapper">
              <input part="input" id="tags-cat-input-0-input" class="tags-input" role="combobox">
            </div>
          </div>
        </mock:shadow-root>
      </cat-tag>
    `);
  });
});

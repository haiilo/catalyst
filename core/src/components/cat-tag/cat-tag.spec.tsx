import { describe, it, expect } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';
import './cat-tag';

describe('cat-tag', () => {
  it('renders', async () => {
    const { root } = await render(<cat-tag />);
    await expect(root.shadowRoot).toEqualHtml(`
      <div class="label-container"></div>
      <div class="input-wrapper">
        <div class="input-inner-wrapper">
          <input part="input" id="tags-cat-input-0-input" class="tags-input" role="combobox">
        </div>
      </div>
    `);
  });
});

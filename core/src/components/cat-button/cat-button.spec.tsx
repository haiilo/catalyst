import { describe, it, expect } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';
import './cat-button';

describe('cat-button', () => {
  it('renders', async () => {
    const { root } = await render(<cat-button />);
    await expect(root.shadowRoot).toEqualHtml(`
      <button type="button" part="button" class="cat-button cat-button-empty cat-button-ellipsed cat-button-outlined cat-button-secondary cat-button-m">
        <span class="cat-button-content" part="content">
          <span class="cat-button-content-inner">
            <slot></slot>
          </span>
        </span>
      </button>
    `);
  });
});

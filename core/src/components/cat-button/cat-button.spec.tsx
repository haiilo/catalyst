import { render, h, describe, it, expect } from '@stencil/vitest';
import'./cat-button';

describe('cat-button', () => {
  it('renders', async () => {
    const { root } = await render(<cat-button />);
    await expect(root).toEqualHtml(`
      <cat-button tabindex="0" class="hydrated">
        <mock:shadow-root shadowrootdelegatesfocus>
          <button type="button" part="button" class="cat-button cat-button-empty cat-button-ellipsed cat-button-outlined cat-button-secondary cat-button-m">
            <span class="cat-button-content" part="content">
              <span class="cat-button-content-inner">
                <slot></slot>
              </span>
            </span>
          </button>
        </mock:shadow-root>
      </cat-button>
    `);
  });
});

import { vi } from 'vitest';
import { render, h, describe, it, expect } from '@stencil/vitest';
vi.mock('./cat-icon-registry', () => ({}));

import './cat-icon';

describe('cat-icon', () => {
  it('renders', async () => {
    const { root } = await render(<cat-icon icon="icon" />);
    await expect(root).toEqualHtml(`
      <cat-icon class="hydrated">
        <mock:shadow-root>
          <span aria-hidden="true" part="icon" class="icon icon-m"></span>
        </mock:shadow-root>
      </cat-icon>
    `);
  });
});

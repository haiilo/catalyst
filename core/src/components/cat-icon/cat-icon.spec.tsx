import { vi, describe, it, expect } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';

vi.mock('./cat-icon-registry', () => ({
  catIconRegistry: {
    getIcon: vi.fn(() => {})
  }
}));

import './cat-icon';

describe('cat-icon', () => {
  it('renders', async () => {
    const { root } = await render(<cat-icon icon="icon" />);
    await expect(root.shadowRoot).toEqualHtml(`
      <span aria-hidden="true" part="icon" class="icon icon-m"></span>
    `);
  });
});

import { describe, it, expect, vi } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';
vi.mock('../cat-i18n/cat-i18n-registry', () => ({
  catI18nRegistry: {
    t: vi.fn(() => {})
  }
}));

import './cat-pagination';

describe('cat-pagination', () => {
  it('renders', async () => {
    const { root } = await render(<cat-pagination />);
    await expect(root).toEqualLightHtml(`
      <cat-pagination tabindex="0" class="hydrated"></cat-pagination>
    `);
  });
});

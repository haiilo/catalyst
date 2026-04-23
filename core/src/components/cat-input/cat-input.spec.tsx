import { describe, it, expect, vi } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';

vi.mock('../cat-i18n/cat-i18n-registry.ts', () => ({
  catI18nRegistry: {
    t: vi.fn(() => {})
  }
}));

import './cat-input';

describe('cat-input', () => {
  it('renders', async () => {
    const { root } = await render(<cat-input label="Label" />);
    await expect(root).toEqualLightHtml(`
      <cat-input tabindex="0" class="hydrated"></cat-input>
    `);
  });
});

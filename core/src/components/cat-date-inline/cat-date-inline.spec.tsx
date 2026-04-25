import { vi, describe, it, expect } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';

vi.mock('../cat-i18n/cat-i18n-registry', () => ({
  catI18nRegistry: {
    t: vi.fn(() => {}),
    getLocale: vi.fn(() => 'en')
  }
}));

import '../cat-input/cat-input';
import './cat-date-inline';

describe('cat-date-inline', () => {
  it('renders', async () => {
    const { root } = await render(<cat-date-inline />);
    await expect(root).toEqualLightHtml(`
      <cat-date-inline tabindex="0" class="hydrated"></cat-date-inline>
    `);
  });
});

import { vi, describe, it, expect } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';

vi.mock('../cat-i18n/cat-i18n-registry');

import '../cat-date-inline/cat-date-inline';
import '../cat-input/cat-input';
import './cat-date';

describe('cat-date', () => {
  it('renders', async () => {
    const { root } = await render(<cat-date />);
    await expect(root).toEqualLightHtml(`
      <cat-date tabindex="0" class="hydrated"></cat-date>
    `);
  });
});

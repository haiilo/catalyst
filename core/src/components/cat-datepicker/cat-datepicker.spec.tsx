import { vi, describe, it, expect } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';

vi.mock('../cat-i18n/cat-i18n-registry');

import './cat-datepicker';

describe('cat-datepicker', () => {
  it('renders', async () => {
    const { root } = await render(<cat-datepicker />);
    await expect(root).toEqualLightHtml(`
      <cat-datepicker class="hydrated"></cat-datepicker>
    `);
  });
});

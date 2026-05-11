import { vi, describe, it, expect } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';

vi.mock('../cat-i18n/cat-i18n-registry');

import './cat-datepicker-inline';

describe('cat-datepicker-inline', () => {
  it('renders', async () => {
    const { root } = await render(<cat-datepicker-inline />);
    await expect(root).toEqualLightHtml(`
      <cat-datepicker-inline class="hydrated"></cat-datepicker-inline>
    `);
  });
});

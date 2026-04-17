import { vi } from 'vitest';
import { render, h, describe, it, expect } from '@stencil/vitest';
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

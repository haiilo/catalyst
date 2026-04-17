import { vi } from 'vitest';
import { render, h, describe, it, expect } from '@stencil/vitest';
vi.mock('../cat-i18n/cat-i18n-registry');

import  './cat-datepicker';

describe('cat-datepicker', () => {
  it('renders', async () => {
    const { root } = await render(<cat-datepicker />);
    await expect(root).toEqualLightHtml(`
      <cat-datepicker class="hydrated"></cat-datepicker>
    `);
  });
});

import { vi } from 'vitest';
import { render, h, describe, it, expect } from '@stencil/vitest';
vi.mock('../cat-i18n/cat-i18n-registry');

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

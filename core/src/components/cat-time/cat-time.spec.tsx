import { vi } from 'vitest';
import { render, h, describe, it, expect } from '@stencil/vitest';

vi.mock('../cat-i18n/cat-i18n-registry');

import '../cat-input/cat-input';
import './cat-time';

describe('cat-time', () => {
  it('renders', async () => {
    const { root } = await render(<cat-time />);
    await expect(root).toEqualLightHtml(`
      <cat-time tabindex="0" class="hydrated"></cat-time>
    `);
  });
});

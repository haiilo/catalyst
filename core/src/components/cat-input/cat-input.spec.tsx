import { vi } from 'vitest';
import { render, h, describe, it, expect } from '@stencil/vitest';

vi.mock('../cat-i18n/cat-i18n-registry.ts', () => ({}));

import './cat-input';

describe('cat-input', () => {
  it('renders', async () => {
    const { root } = await render(<cat-input label="Label" />);
    await expect(root).toEqualLightHtml(`
      <cat-input tabindex="0" class="hydrated"></cat-input>
    `);
  });
});

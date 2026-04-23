import { describe, it, expect, vi } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';

vi.mock('../cat-i18n/cat-i18n-registry');

import './cat-textarea';

describe('cat-textarea', () => {
  it('renders', async () => {
    const { root } = await render(<cat-textarea label="Label" />);
    await expect(root).toEqualLightHtml(`
      <cat-textarea tabindex="0" class="hydrated"></cat-textarea>
    `);
  });
});

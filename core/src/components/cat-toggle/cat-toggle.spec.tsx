import { describe, it, expect } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';
import './cat-toggle';

describe('cat-toggle', () => {
  it('renders', async () => {
    const { root } = await render(<cat-toggle label="Label" />);
    await expect(root).toEqualLightHtml(`
      <cat-toggle tabindex="0" class="hydrated"></cat-toggle>
    `);
  });
});

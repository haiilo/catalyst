import { describe, it, expect } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';
import './cat-avatar';

describe('cat-avatar', () => {
  it('renders', async () => {
    const { root } = await render(<cat-avatar label="Label" />);
    await expect(root).toEqualLightHtml(`
      <cat-avatar class="hydrated"></cat-avatar>
    `);
  });
});

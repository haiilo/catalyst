import { describe, it, expect } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';
import './cat-scrollable';

describe('cat-scrollable', () => {
  it('renders', async () => {
    const { root } = await render(<cat-scrollable />);
    await expect(root).toEqualLightHtml(`
      <cat-scrollable class="hydrated"></cat-scrollable>
    `);
  });
});

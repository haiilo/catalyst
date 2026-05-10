import { describe, it, expect } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';
import './cat-skeleton';

describe('cat-skeleton', () => {
  it('renders', async () => {
    const { root } = await render(<cat-skeleton />);
    await expect(root).toEqualLightHtml(`
      <cat-skeleton class="hydrated"></cat-skeleton>
    `);
  });
});

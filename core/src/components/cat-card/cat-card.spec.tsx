import { describe, it, expect } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';
import './cat-card';

describe('cat-card', () => {
  it('renders', async () => {
    const { root } = await render(<cat-card />);
    await expect(root).toEqualLightHtml(`
      <cat-card class="hydrated"></cat-card>
    `);
  });
});

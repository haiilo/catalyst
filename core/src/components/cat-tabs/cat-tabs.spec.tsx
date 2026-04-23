import { describe, it, expect } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';
import './cat-tabs';

describe('cat-tabs', () => {
  it('renders', async () => {
    const { root } = await render(<cat-tabs />);
    await expect(root).toEqualLightHtml(`
      <cat-tabs tabindex="0" class="hydrated"></cat-tabs>
    `);
  });
});

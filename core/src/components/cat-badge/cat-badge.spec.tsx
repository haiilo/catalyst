import { describe, it, expect } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';
import './cat-badge';

describe('cat-badge', () => {
  it('renders', async () => {
    const { root } = await render(<cat-badge />);
    await expect(root).toEqualLightHtml(`
      <cat-badge variant="filled" color="primary" size="m" class="hydrated"></cat-badge>
    `);
  });
});

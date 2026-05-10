import { describe, it, expect } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';
import './cat-alert';

describe('cat-alert', () => {
  it('renders', async () => {
    const { root } = await render(<cat-alert />);
    await expect(root).toEqualLightHtml(`
      <cat-alert tabindex="0" role="status" color="primary" class="hydrated"></cat-alert>
    `);
  });
});

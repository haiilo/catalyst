import { describe, it, expect } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';
import './cat-form-group';

describe('cat-form-group', () => {
  it('renders', async () => {
    const { root } = await render(<cat-form-group />);
    await expect(root).toEqualLightHtml(`
      <cat-form-group class="hydrated"></cat-form-group>
    `);
  });
});

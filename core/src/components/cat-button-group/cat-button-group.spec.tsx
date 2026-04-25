import { describe, it, expect } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';
import './cat-button-group';

describe('cat-button-group', () => {
  it('renders', async () => {
    const { root } = await render(<cat-button-group />);
    await expect(root).toEqualLightHtml(`
      <cat-button-group role="group" class="hydrated"></cat-button-group>
    `);
  });
});

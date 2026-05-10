import { describe, it, expect } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';
import './cat-checkbox';

describe('cat-checkbox', () => {
  it('renders', async () => {
    const { root } = await render(<cat-checkbox label="Label" />);
    await expect(root).toEqualLightHtml(`
      <cat-checkbox class="hydrated"></cat-checkbox>
    `);
  });
});

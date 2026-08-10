import { describe, it, expect } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';
import './cat-segmented-control';

describe('cat-segmented-control', () => {
  it('renders', async () => {
    const { root } = await render(<cat-segmented-control />);
    await expect(root).toEqualLightHtml(`
      <cat-segmented-control class="hydrated"></cat-segmented-control>
    `);
  });
});

import { describe, it, expect } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';
import './cat-tab';

describe('cat-tab', () => {
  it('renders', async () => {
    const { root } = await render(<cat-tab />);
    await expect(root).toEqualLightHtml(`
      <cat-tab id="cat-tab-0" label class="hydrated"></cat-tab>
    `);
  });
});

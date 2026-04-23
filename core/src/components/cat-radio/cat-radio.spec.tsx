import { describe, it, expect } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';

import './cat-radio';

describe('cat-radio', () => {
  it('renders', async () => {
    const { root } = await render(<cat-radio label="Label" />);
    await expect(root).toEqualLightHtml(`
      <cat-radio tabindex="0" class="hydrated"></cat-radio>
    `);
  });
});

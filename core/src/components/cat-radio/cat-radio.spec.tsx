import { render, h, describe, it, expect } from '@stencil/vitest';

import './cat-radio';

describe('cat-radio', () => {
  it('renders', async () => {
    const { root } = await render(<cat-radio label="Label" />);
    await expect(root).toEqualLightHtml(`
      <cat-radio tabindex="0" class="hydrated"></cat-radio>
    `);
  });
});

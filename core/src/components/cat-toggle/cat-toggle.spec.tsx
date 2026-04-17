import { render, h, describe, it, expect } from '@stencil/vitest';
import './cat-toggle';

describe('cat-toggle', () => {
  it('renders', async () => {
    const { root } = await render(<cat-toggle label="Label" />);
    await expect(root).toEqualLightHtml(`
      <cat-toggle tabindex="0" class="hydrated"></cat-toggle>
    `);
  });
});

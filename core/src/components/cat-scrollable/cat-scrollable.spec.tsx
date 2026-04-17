import { render, h, describe, it, expect } from '@stencil/vitest';
import './cat-scrollable';

describe('cat-scrollable', () => {
  it('renders', async () => {
    const { root } = await render(<cat-scrollable />);
    await expect(root).toEqualLightHtml(`
      <cat-scrollable class="hydrated"></cat-scrollable>
    `);
  });
});

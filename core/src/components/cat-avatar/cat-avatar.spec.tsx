import { render, h, describe, it, expect } from '@stencil/vitest';
import './cat-avatar';

describe('cat-avatar', () => {
  it('renders', async () => {
    const { root } = await render(<cat-avatar label="Label" />);
    await expect(root).toEqualLightHtml(`
      <cat-avatar class="hydrated"></cat-avatar>
    `);
  });
});

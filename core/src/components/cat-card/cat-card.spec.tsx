import { render, h, describe, it, expect } from '@stencil/vitest';
import './cat-card';

describe('cat-card', () => {
  it('renders', async () => {
    const { root } = await render(<cat-card />);
    await expect(root).toEqualLightHtml(`
      <cat-card class="hydrated"></cat-card>
    `);
  });
});

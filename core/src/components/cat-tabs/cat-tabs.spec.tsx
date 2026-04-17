import { render, h, describe, it, expect } from '@stencil/vitest';
import './cat-tabs';

describe('cat-tabs', () => {
  it('renders', async () => {
    const { root } = await render(<cat-tabs />);
    await expect(root).toEqualLightHtml(`
      <cat-tabs tabindex="0" class="hydrated"></cat-tabs>
    `);
  });
});

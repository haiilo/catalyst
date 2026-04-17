import { render, h, describe, it, expect } from '@stencil/vitest';
import './cat-skeleton';

describe('cat-skeleton', () => {
  it('renders', async () => {
    const { root } = await render(<cat-skeleton />);
    await expect(root).toEqualLightHtml(`
      <cat-skeleton class="hydrated"></cat-skeleton>
    `);
  });
});

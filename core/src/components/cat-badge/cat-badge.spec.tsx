import { render, h, describe, it, expect } from '@stencil/vitest';
import './cat-badge';

describe('cat-badge', () => {
  it('renders', async () => {
    const { root } = await render(<cat-badge />);
    await expect(root).toEqualLightHtml(`
      <cat-badge variant="filled" color="primary" size="m" class="hydrated"></cat-badge>
    `);
  });
});

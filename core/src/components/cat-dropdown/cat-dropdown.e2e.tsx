import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-dropdown', () => {
  it('renders', async () => {
    const { root } = await render(
      <cat-dropdown>
        <button slot="trigger" />
        <nav slot="content" />
      </cat-dropdown>
    );
    await expect.element(root).toHaveClass('hydrated');
  });
});

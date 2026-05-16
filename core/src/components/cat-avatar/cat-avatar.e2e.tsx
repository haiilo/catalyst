import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-avatar', () => {
  it('renders', async () => {
    const { root } = await render(<cat-avatar label="Avatar" />);
    await expect.element(root).toHaveClass('hydrated');
  });
});

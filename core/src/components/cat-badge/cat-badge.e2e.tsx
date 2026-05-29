import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-badge', () => {
  it('renders', async () => {
    const { root } = await render(<cat-badge />);
    await expect.element(root).toHaveClass('hydrated');
  });
});

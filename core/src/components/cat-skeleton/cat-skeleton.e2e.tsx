import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-skeleton', () => {
  it('renders', async () => {
    const { root } = await render(<cat-skeleton />);
    await expect.element(root).toHaveClass('hydrated');
  });
});

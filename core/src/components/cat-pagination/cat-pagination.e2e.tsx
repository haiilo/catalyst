import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-pagination', () => {
  it('renders', async () => {
    const { root } = await render(<cat-pagination />);
    await expect.element(root).toHaveClass('hydrated');
  });
});

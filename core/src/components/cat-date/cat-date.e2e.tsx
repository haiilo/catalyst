import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-date', () => {
  it('renders', async () => {
    const { root } = await render(<cat-date />);
    await expect.element(root).toHaveClass('hydrated');
  });
});

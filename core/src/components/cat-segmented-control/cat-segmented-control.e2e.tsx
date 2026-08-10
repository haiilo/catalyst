import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-segmented-control', () => {
  it('renders hydrated', async () => {
    const { root } = await render(<cat-segmented-control />);
    await expect.element(root).toHaveClass('hydrated');
  });
});

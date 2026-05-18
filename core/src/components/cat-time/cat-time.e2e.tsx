import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-time', () => {
  it('renders', async () => {
    const { root } = await render(<cat-time />);
    await expect.element(root).toHaveClass('hydrated');
  });
});

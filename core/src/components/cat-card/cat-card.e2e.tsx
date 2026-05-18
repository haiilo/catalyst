import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-card', () => {
  it('renders', async () => {
    const { root } = await render(<cat-card />);
    await expect.element(root).toHaveClass('hydrated');
  });
});

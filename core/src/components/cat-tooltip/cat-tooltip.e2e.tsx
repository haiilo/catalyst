import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-tooltip', () => {
  it('renders', async () => {
    const { root } = await render(<cat-tooltip />);
    await expect.element(root).toHaveClass('hydrated');
  });
});

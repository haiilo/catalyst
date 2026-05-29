import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-scrollable', () => {
  it('renders', async () => {
    const { root } = await render(<cat-scrollable />);
    await expect.element(root).toHaveClass('hydrated');
  });
});

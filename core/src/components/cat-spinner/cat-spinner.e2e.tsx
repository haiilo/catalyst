import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-spinner', () => {
  it('renders', async () => {
    const { root } = await render(<cat-spinner />);
    await expect.element(root).toHaveClass('hydrated');
  });
});

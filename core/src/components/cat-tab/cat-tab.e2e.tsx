import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-tab', () => {
  it('renders', async () => {
    const { root } = await render(<cat-tab />);
    await expect.element(root).toHaveClass('hydrated');
  });
});

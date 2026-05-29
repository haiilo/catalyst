import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-button-group', () => {
  it('renders', async () => {
    const { root } = await render(<cat-button-group />);
    await expect.element(root).toHaveClass('hydrated');
  });
});

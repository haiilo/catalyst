import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-icon', () => {
  it('renders', async () => {
    const { root } = await render(<cat-icon icon="icon" />);
    await expect.element(root).toHaveClass('hydrated');
  });
});

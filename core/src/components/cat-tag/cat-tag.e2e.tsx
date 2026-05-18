import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-tag', () => {
  it('renders', async () => {
    const { root } = await render(<cat-tag label="Label" />);
    await expect.element(root).toHaveClass('hydrated');
  });
});

import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-textarea', () => {
  it('renders', async () => {
    const { root } = await render(<cat-textarea label="Label" />);
    await expect.element(root).toHaveClass('hydrated');
  });
});

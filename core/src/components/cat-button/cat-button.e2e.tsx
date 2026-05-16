import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-button', () => {
  it('renders', async () => {
    const { root } = await render(<cat-button />);
    await expect.element(root).toHaveClass('hydrated');
  });
});

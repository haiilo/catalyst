import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-form-group', () => {
  it('renders', async () => {
    const { root } = await render(<cat-form-group />);
    await expect.element(root).toHaveClass('hydrated');
  });
});

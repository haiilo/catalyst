import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-radio-group', () => {
  it('renders', async () => {
    const { root } = await render(<cat-radio-group />);
    await expect.element(root).toHaveClass('hydrated');
  });
});

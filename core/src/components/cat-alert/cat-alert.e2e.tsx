import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-alert', () => {
  it('renders', async () => {
    const { root } = await render(<cat-alert />);
    await expect.element(root).toHaveClass('hydrated');
  });
});

import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-date-inline', () => {
  it('renders', async () => {
    const { root } = await render(<cat-date-inline />);
    await expect.element(root).toHaveClass('hydrated');
  });
});

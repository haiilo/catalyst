import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-radio', () => {
  it('renders', async () => {
    const { root } = await render(<cat-radio label="Label" />);
    await expect.element(root).toHaveClass('hydrated');
  });
});

import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-datepicker', () => {
  it('renders', async () => {
    const { root } = await render(<cat-datepicker label="Label" />);
    await expect.element(root).toHaveClass('hydrated');
  });
});

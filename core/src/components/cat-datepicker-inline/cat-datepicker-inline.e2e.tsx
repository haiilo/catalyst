import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-datepicker-inline', () => {
  it('renders', async () => {
    const { root } = await render(<cat-datepicker-inline />);
    await expect.element(root).toHaveClass('hydrated');
  });
});

import { render, h, describe, it, expect } from '@stencil/vitest';
import './cat-checkbox';

describe('cat-checkbox', () => {
  it('renders', async () => {
    const { root } = await render(<cat-checkbox label="Label" />);
    await expect(root).toEqualLightHtml(`
      <cat-checkbox class="hydrated"></cat-checkbox>
    `);
  });
});

import { render, h, describe, it, expect } from '@stencil/vitest';
import './cat-form-group';

describe('cat-form-group', () => {
  it('renders', async () => {
    const { root } = await render(<cat-form-group />);
    await expect(root).toEqualLightHtml(`
      <cat-form-group class="hydrated"></cat-form-group>
    `);
  });
});

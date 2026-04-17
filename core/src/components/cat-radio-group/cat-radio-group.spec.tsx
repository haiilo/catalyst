import { render, h, describe, it, expect } from '@stencil/vitest';
import './cat-radio-group';

describe('cat-radio-group', () => {
  it('renders', async () => {
    const { root } = await render(<cat-radio-group />);
    await expect(root).toEqualLightHtml(`
      <cat-radio-group class="hydrated"></cat-radio-group>
    `);
  });
});

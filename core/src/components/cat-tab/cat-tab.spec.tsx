import { render, h, describe, it, expect } from '@stencil/vitest';
import './cat-tab';

describe('cat-tab', () => {
  it('renders', async () => {
    const { root } = await render(<cat-tab />);
    await expect(root).toEqualLightHtml(`
      <cat-tab id="cat-tab-0" class="hydrated"></cat-tab>
    `);
  });
});

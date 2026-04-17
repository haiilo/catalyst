import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';
import './cat-tooltip';

describe('cat-tooltip', () => {
  it('renders', async () => {
    const { root } = await render(
      <cat-tooltip content="This is a tooltip">
        <p>Hover me</p>
      </cat-tooltip>
    );
    await expect(root).toEqualLightHtml(`
      <cat-tooltip id="cat-tooltip-0" class="hydrated">
        <p aria-describedby="cat-tooltip-0">
          Hover me
        </p>
      </cat-tooltip>
    `);
  });
});

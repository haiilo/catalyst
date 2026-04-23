import { describe, it, expect } from 'vitest';
import { render } from '@stencil/vitest';
import { CatFormHint } from './cat-form-hint';
import { h } from '@stencil/core';

describe('CatFormHint', () => {
  it('renders', async () => {
    const { root } = await render(<CatFormHint id="host-id"/>);
    await expect(root).toEqualLightHtml(`
      <div aria-live="polite" id="host-id-hint" class="hint-section"></div>
    `);
  });
});

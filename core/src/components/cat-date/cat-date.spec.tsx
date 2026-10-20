import { vi, describe, it, expect } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';

vi.mock('../cat-i18n/cat-i18n-registry');

import '../cat-date-inline/cat-date-inline';
import '../cat-input/cat-input';
import './cat-date';

describe('cat-date', () => {
  it('renders', async () => {
    const { root } = await render(<cat-date />);
    await expect(root).toEqualLightHtml(`
      <cat-date tabindex="0" class="hydrated"></cat-date>
    `);
  });

  it('forwards day variants to the inline date picker', async () => {
    const dayVariants = { '2026-10-20': 'danger' as const };
    const { root } = await render(<cat-date dayVariants={dayVariants} />);

    expect(root.shadowRoot?.querySelector('cat-date-inline')?.dayVariants).toEqual(dayVariants);
  });

  it('forwards the visible date range from cat-date-inline', async () => {
    const { root } = await render(<cat-date />);
    const viewChange = vi.fn();
    root.addEventListener('catDateViewChange', viewChange);
    const detail = { from: '2026-10-12', to: '2026-11-22' };

    root.shadowRoot?.querySelector('cat-date-inline')?.dispatchEvent(
      new CustomEvent('catDateViewChange', {
        detail,
        bubbles: true,
        composed: true
      })
    );

    expect(viewChange).toHaveBeenCalledTimes(1);
    expect(viewChange).toHaveBeenCalledWith(expect.objectContaining({ detail }));
  });
});

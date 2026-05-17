import { vi, describe, it, expect } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';

vi.mock('./cat-icon-registry', () => ({
  catIconRegistry: {
    getIcon: vi.fn(() => {})
  }
}));

import './cat-icon';

describe('cat-icon', () => {
  it('renders without an icon', async () => {
    const { root } = await render(<cat-icon />);
    expect(root.shadowRoot).toEqualLightHtml(`
      <span aria-hidden="true" part="icon" class="icon icon-m"></span>
    `);
  });

  it('renders with an icon name (falls back to global registry when no provider)', async () => {
    const { root } = await render(<cat-icon icon="icon" />);
    // The mock registry returns undefined, so innerHTML is empty
    expect(root.shadowRoot).toEqualLightHtml(`
      <span aria-hidden="true" part="icon" class="icon icon-m"></span>
    `);
  });

  it('renders with iconSrc, bypassing registry entirely', async () => {
    const { root } = await render(<cat-icon icon-src="<svg/>" />);
    // JSDOM normalises self-closing SVG tags to <svg></svg>
    expect(root.shadowRoot?.querySelector('span')?.innerHTML).toContain('svg');
  });

  it('dispatches a cat-icon-request event when an icon name is set', async () => {
    const { root, waitForChanges } = await render(<cat-icon />);
    const events: CustomEvent[] = [];
    const handler = (e: Event) => events.push(e as CustomEvent);
    document.body.addEventListener('cat-icon-request', handler);

    root.setAttribute('icon', 'home');
    await waitForChanges();

    const iconEvents = events.filter(e => e.detail?.name === 'home');
    expect(iconEvents.length).toBeGreaterThan(0);
    expect(iconEvents[0].cancelable).toBe(true);
    expect(iconEvents[0].bubbles).toBe(true);

    document.body.removeEventListener('cat-icon-request', handler);
  });
});

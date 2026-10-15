import { vi, describe, it, expect } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';

vi.mock('../cat-i18n/cat-i18n-registry', () => ({
  catI18nRegistry: {
    t: vi.fn(() => {}),
    getLocale: vi.fn(() => 'en')
  }
}));

import '../cat-input/cat-input';
import './cat-date-inline';

describe('cat-date-inline', () => {
  it('renders', async () => {
    const { root } = await render(<cat-date-inline />);
    await expect(root).toEqualLightHtml(`
      <cat-date-inline tabindex="0" class="hydrated"></cat-date-inline>
    `);
  });

  it('renders each semantic variant for local ISO dates', async () => {
    const variants = ['primary', 'secondary', 'info', 'success', 'warning', 'danger'] as const;
    const now = new Date();
    const dateKeys = variants.map((_, index) => {
      const date = new Date(now.getFullYear(), now.getMonth(), index + 1);
      return [date.getFullYear(), date.getMonth() + 1, date.getDate()]
        .map((part, partIndex) => (partIndex === 0 ? String(part) : String(part).padStart(2, '0')))
        .join('-');
    });
    const dayVariants = Object.fromEntries(dateKeys.map((date, index) => [date, variants[index]]));
    const { root } = await render(<cat-date-inline dayVariants={dayVariants} />);

    dateKeys.forEach((date, index) => {
      expect(root.shadowRoot?.querySelector(`[data-date="${date}"]`)).toHaveClass(`date-variant-${variants[index]}`);
    });
  });

  it('emits the visible inclusive range when navigating', async () => {
    const { root, waitForChanges } = await render(<cat-date-inline />);
    const viewChange = vi.fn();
    root.addEventListener('catDateViewChange', viewChange);

    (root.shadowRoot?.querySelectorAll('cat-button')[2] as HTMLElement).click();
    await waitForChanges();

    const inline = root as HTMLCatDateInlineElement;
    await inline.resetView();
    await waitForChanges();
    await inline.resetView();

    expect(viewChange).toHaveBeenCalledTimes(2);
    const emittedRanges = viewChange.mock.calls.map(([event]) => event.detail);
    emittedRanges.forEach(range => {
      expect(range.from).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(range.to).toMatch(/^\d{4}-\d{2}-\d{2}$/);
    });
    expect(emittedRanges[0]).not.toEqual(emittedRanges[1]);
  });
});

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

  it('renders day states for local ISO dates', async () => {
    const today = new Date();
    const date = [today.getFullYear(), today.getMonth() + 1, today.getDate()]
      .map((part, index) => (index === 0 ? String(part) : String(part).padStart(2, '0')))
      .join('-');
    const { root } = await render(<cat-date-inline dayVariants={{ [date]: 'danger' }} />);

    expect(root.shadowRoot?.querySelector(`[data-date="${date}"]`)).toHaveClass('date-variant-danger');
  });

  it('emits the visible inclusive range when navigating', async () => {
    const { root } = await render(<cat-date-inline />);
    const viewChange = vi.fn();
    root.addEventListener('catViewChange', viewChange);

    (root.shadowRoot?.querySelectorAll('cat-button')[2] as HTMLElement).click();
    await new Promise(resolve => setTimeout(resolve));

    expect(viewChange).toHaveBeenCalledWith(
      expect.objectContaining({
        detail: {
          from: expect.any(String),
          to: expect.any(String)
        }
      })
    );
  });
});

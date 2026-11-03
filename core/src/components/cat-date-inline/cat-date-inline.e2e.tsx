import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';
import { userEvent } from '@vitest/browser/context';

describe('cat-date-inline', () => {
  it('renders', async () => {
    const { root } = await render(<cat-date-inline />);
    await expect.element(root).toHaveClass('hydrated');
  });

  it('supports day descriptions during keyboard navigation', async () => {
    const { root } = await render(
      <cat-date-inline
        value="2026-10-20"
        dayNativeAttributes={{
          '2026-10-21': { 'aria-description': 'Special day' }
        }}
      />
    );
    const picker = root as HTMLCatDateInlineElement;
    const next = root.shadowRoot!.querySelector<HTMLCatButtonElement>('[data-date="2026-10-21"]')!;
    const button = next.shadowRoot!.querySelector('button')!;

    await picker.doFocus();
    await userEvent.keyboard('{ArrowRight}');
    expect(root.shadowRoot!.activeElement).toBe(next);
    expect(picker.value).toBe('2026-10-20');
    await expect.element(button).toHaveAccessibleName(next.a11yLabel);
    await expect.element(button).toHaveAccessibleDescription('Special day');
    await userEvent.keyboard('{Enter}');
    expect(picker.value).toBe('2026-10-21');
  });

  it('updates day descriptions without moving focus', async () => {
    const { root } = await render(<cat-date-inline value="2026-10-20" />);
    const picker = root as HTMLCatDateInlineElement;
    const selected = root.shadowRoot!.querySelector<HTMLCatButtonElement>('[data-date="2026-10-20"]')!;
    const button = selected.shadowRoot!.querySelector('button')!;
    await picker.doFocus();

    picker.dayNativeAttributes = { '2026-10-20': { 'aria-description': 'Special day' } };
    await expect.element(button).toHaveAccessibleDescription('Special day');
    expect(root.shadowRoot!.activeElement).toBe(selected);

    picker.dayNativeAttributes = {};
    await expect.element(button).not.toHaveAttribute('aria-description');
    expect(root.shadowRoot!.activeElement).toBe(selected);
  });
});

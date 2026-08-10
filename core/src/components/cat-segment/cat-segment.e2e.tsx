import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-segment', () => {
  it('renders hydrated', async () => {
    const { root } = await render(<cat-segment value="a">Day</cat-segment>);
    await expect.element(root).toHaveClass('hydrated');
  });

  it('delegates focus to its native button', async () => {
    const { root } = await render(<cat-segment value="day">Day</cat-segment>);
    const button = root.shadowRoot?.querySelector<HTMLButtonElement>('button');

    button?.focus();

    expect(document.activeElement).toBe(root);
    expect(root.shadowRoot?.activeElement).toBe(button);
  });

  it('focuses and blurs through public methods', async () => {
    const { root } = await render<HTMLCatSegmentElement>(<cat-segment value="day">Day</cat-segment>);
    const button = root.shadowRoot?.querySelector<HTMLButtonElement>('button');

    await root.doFocus();
    expect(root.shadowRoot?.activeElement).toBe(button);

    await root.doBlur();
    expect(root.shadowRoot?.activeElement).toBeNull();
  });

  it('emits catSegmentClick on click', async () => {
    const { root } = await render(<cat-segment value="day">Day</cat-segment>);
    const events: CustomEvent[] = [];
    root.addEventListener('catSegmentClick', (e: Event) => events.push(e as CustomEvent));
    root.shadowRoot?.querySelector<HTMLButtonElement>('button')?.click();
    expect(events).toHaveLength(1);
    expect(events[0].detail).toBe('day');
    expect(events[0].bubbles).toBe(true);
    expect(events[0].composed).toBe(true);
  });

  it('does not emit catSegmentClick when disabled', async () => {
    const { root } = await render(
      <cat-segment value="day" disabled>
        Day
      </cat-segment>
    );
    const events: Event[] = [];
    root.addEventListener('catSegmentClick', e => events.push(e));
    root.shadowRoot?.querySelector<HTMLButtonElement>('button')?.click();
    expect(events).toHaveLength(0);
  });
});

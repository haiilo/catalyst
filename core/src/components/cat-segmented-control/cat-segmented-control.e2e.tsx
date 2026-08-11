import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-segmented-control', () => {
  it('renders hydrated', async () => {
    const { root } = await render(<cat-segmented-control />);
    await expect.element(root).toHaveClass('hydrated');
  });

  it('moves focus with arrow keys and wraps at control boundaries', async () => {
    const { root } = await render(
      <cat-segmented-control>
        <cat-segment value="one">Option 1</cat-segment>
        <cat-segment value="two">Option 2</cat-segment>
        <cat-segment value="three">Option 3</cat-segment>
      </cat-segmented-control>
    );
    const segments = Array.from(root.querySelectorAll<HTMLCatSegmentElement>('cat-segment'));
    const buttons = segments.map(segment => segment.shadowRoot?.querySelector<HTMLButtonElement>('button'));

    buttons[0]?.focus();
    root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, composed: true }));
    await Promise.resolve();
    expect(segments[1].shadowRoot?.activeElement).toBe(buttons[1]);

    root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, composed: true }));
    await Promise.resolve();
    expect(segments[0].shadowRoot?.activeElement).toBe(buttons[0]);

    root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, composed: true }));
    await Promise.resolve();
    expect(segments[2].shadowRoot?.activeElement).toBe(buttons[2]);
  });

  it('skips disabled segments during keyboard navigation', async () => {
    const { root } = await render(
      <cat-segmented-control>
        <cat-segment value="one">Option 1</cat-segment>
        <cat-segment value="two" disabled>
          Option 2
        </cat-segment>
        <cat-segment value="three">Option 3</cat-segment>
      </cat-segmented-control>
    );
    const segments = Array.from(root.querySelectorAll<HTMLCatSegmentElement>('cat-segment'));
    const buttons = segments.map(segment => segment.shadowRoot?.querySelector<HTMLButtonElement>('button'));

    buttons[0]?.focus();
    root.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, composed: true }));
    await Promise.resolve();

    expect(segments[2].shadowRoot?.activeElement).toBe(buttons[2]);
    expect(segments[1].shadowRoot?.activeElement).not.toBe(buttons[1]);
  });

  it('forwards focus and blur events from segments', async () => {
    const { root } = await render(
      <cat-segmented-control>
        <cat-segment value="one">Option 1</cat-segment>
      </cat-segmented-control>
    );
    const events: { type: string; detail: string }[] = [];
    root.addEventListener('catFocus', event => {
      events.push({ type: 'focus', detail: (event as CustomEvent<string>).detail });
    });
    root.addEventListener('catBlur', event => {
      events.push({ type: 'blur', detail: (event as CustomEvent<string>).detail });
    });
    const button = root.querySelector('cat-segment')?.shadowRoot?.querySelector<HTMLButtonElement>('button');

    button?.focus();
    button?.blur();

    expect(events).toEqual([
      { type: 'focus', detail: 'one' },
      { type: 'blur', detail: 'one' }
    ]);
  });
});

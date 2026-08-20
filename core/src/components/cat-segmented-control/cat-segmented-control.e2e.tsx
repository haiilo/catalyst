import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';

describe('cat-segmented-control', () => {
  it('renders hydrated', async () => {
    const { root } = await render(<cat-segmented-control />);
    await expect.element(root).toHaveClass('hydrated');
  });

  it('moves selection with arrow keys and wraps at control boundaries', async () => {
    const { root, waitForChanges } = await render<HTMLCatSegmentedControlElement>(
      <cat-segmented-control>
        <cat-segment value="one">Option 1</cat-segment>
        <cat-segment value="two">Option 2</cat-segment>
        <cat-segment value="three">Option 3</cat-segment>
      </cat-segmented-control>
    );
    const segments = Array.from(root.querySelectorAll<HTMLCatSegmentElement>('cat-segment'));
    const buttons = segments.map(segment => segment.shadowRoot?.querySelector<HTMLButtonElement>('button'));

    buttons[0]?.focus();
    buttons[0]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, composed: true }));
    await waitForChanges();
    expect(root.value).toBe('two');
    expect(document.activeElement?.shadowRoot?.activeElement).toBe(buttons[1]);
    expect(buttons[0]?.getAttribute('aria-checked')).toBe('false');
    expect(buttons[1]?.getAttribute('aria-checked')).toBe('true');

    buttons[1]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, composed: true }));
    await waitForChanges();
    expect(root.value).toBe('one');
    expect(document.activeElement?.shadowRoot?.activeElement).toBe(buttons[0]);
    expect(buttons[0]?.getAttribute('aria-checked')).toBe('true');
    expect(buttons[1]?.getAttribute('aria-checked')).toBe('false');

    buttons[0]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft', bubbles: true, composed: true }));
    await waitForChanges();
    expect(root.value).toBe('three');
    expect(document.activeElement?.shadowRoot?.activeElement).toBe(buttons[2]);
    expect(buttons[0]?.getAttribute('aria-checked')).toBe('false');
    expect(buttons[2]?.getAttribute('aria-checked')).toBe('true');
  });

  it('skips disabled segments during keyboard navigation', async () => {
    const { root, waitForChanges } = await render<HTMLCatSegmentedControlElement>(
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
    buttons[0]?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, composed: true }));
    await waitForChanges();

    expect(root.value).toBe('three');
    expect(buttons[2]?.getAttribute('aria-checked')).toBe('true');
    expect(buttons[1]?.getAttribute('aria-checked')).toBe('false');
  });

  it('selects a segment when its button is clicked', async () => {
    const { root, waitForChanges } = await render<HTMLCatSegmentedControlElement>(
      <cat-segmented-control>
        <cat-segment value="one">Option 1</cat-segment>
        <cat-segment value="two">Option 2</cat-segment>
      </cat-segmented-control>
    );
    const button = root
      .querySelector('cat-segment:nth-of-type(2)')
      ?.shadowRoot?.querySelector<HTMLButtonElement>('button');
    const changeListener = (event: Event) => {
      expect((event as CustomEvent<string>).detail).toBe('two');
    };
    root.addEventListener('catChange', changeListener);

    await button?.click();
    await waitForChanges();

    expect(root.value).toBe('two');
    expect(button?.getAttribute('aria-checked')).toBe('true');
    root.removeEventListener('catChange', changeListener);
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

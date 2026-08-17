import { describe, expect, it, vi } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';
import './cat-segmented-control';

describe('cat-segmented-control', () => {
  it('renders', async () => {
    const { root } = await render(
      <cat-segmented-control>
        <cat-segment value="one">Option 1</cat-segment>
        <cat-segment value="two">Option 2</cat-segment>
      </cat-segmented-control>
    );

    expect(root).toEqualLightHtml(`
      <cat-segmented-control class="hydrated">
         <cat-segment value="one">
           Option 1
         </cat-segment>
         <cat-segment value="two">
           Option 2
         </cat-segment>
      </cat-segmented-control>
    `);
  });

  it('handles a segment selection event', async () => {
    const { root, waitForChanges } = await render<HTMLCatSegmentedControlElement>(
      <cat-segmented-control>
        <cat-segment value="one">Option 1</cat-segment>
        <cat-segment value="two" test-id="optionTwo">
          Option 2
        </cat-segment>
      </cat-segmented-control>
    );

    const changeListener = vi.fn();
    root.addEventListener('catChange', changeListener);

    const segment = root.querySelector<HTMLCatSegmentElement>('[test-id="optionTwo"]');

    expect(segment).not.toBeNull();
    segment?.dispatchEvent(new CustomEvent('catSegmentClick', { detail: 'two', bubbles: true, composed: true }));
    await waitForChanges();

    expect(changeListener).toHaveBeenCalledWith(expect.objectContaining({ detail: 'two' }));
  });

  it('emits the focused segment value', async () => {
    const { root } = await render<HTMLCatSegmentedControlElement>(
      <cat-segmented-control>
        <cat-segment value="one">Option 1</cat-segment>
      </cat-segmented-control>
    );
    const focusListener = vi.fn();
    root.addEventListener('catFocus', focusListener);

    root.querySelector('cat-segment')?.dispatchEvent(
      new CustomEvent('catSegmentFocus', {
        detail: 'one',
        bubbles: true,
        composed: true
      })
    );

    expect(focusListener).toHaveBeenCalledOnce();
    expect(focusListener.mock.calls[0][0]).toMatchObject({ detail: 'one' });
  });

  it('emits the blurred segment value', async () => {
    const { root } = await render<HTMLCatSegmentedControlElement>(
      <cat-segmented-control>
        <cat-segment value="one">Option 1</cat-segment>
      </cat-segmented-control>
    );
    const blurListener = vi.fn();
    root.addEventListener('catBlur', blurListener);

    root.querySelector('cat-segment')?.dispatchEvent(
      new CustomEvent('catSegmentBlur', {
        detail: 'one',
        bubbles: true,
        composed: true
      })
    );

    expect(blurListener).toHaveBeenCalledOnce();
    expect(blurListener.mock.calls[0][0]).toMatchObject({ detail: 'one' });
  });

  it('renders group accessibility and native attributes', async () => {
    const { root, waitForChanges } = await render<HTMLCatSegmentedControlElement>(
      <cat-segmented-control
        a11yLabel="Test aria label"
        testId="test-id"
        nativeAttributes={{ 'data-context': 'settings' }}
      >
        <cat-segment value="one">Option 1</cat-segment>
      </cat-segmented-control>
    );

    await waitForChanges();
    const group = root.shadowRoot?.querySelector('[role="radiogroup"]');

    expect(group?.getAttribute('aria-label')).toBe('Test aria label');
    expect(group?.getAttribute('data-test')).toBe('test-id');
    expect(group?.getAttribute('data-context')).toBe('settings');
  });

  it('renders radio state and roving tabindex', async () => {
    const { root, waitForChanges } = await render<HTMLCatSegmentedControlElement>(
      <cat-segmented-control value="two">
        <cat-segment value="one">Option 1</cat-segment>
        <cat-segment value="two">Option 2</cat-segment>
      </cat-segmented-control>
    );

    await waitForChanges();

    const segments = Array.from(root.querySelectorAll<HTMLCatSegmentElement>('cat-segment'));
    expect(root.value).toBe('two');
    expect(segments).toHaveLength(2);
  });

  it('preserves required group semantics over native attributes', async () => {
    const { root } = await render(
      <cat-segmented-control
        a11yLabel="Required label"
        nativeAttributes={{ role: 'button', 'aria-label': 'Override', class: 'override' }}
      >
        <cat-segment value="one">Option 1</cat-segment>
      </cat-segmented-control>
    );
    const group = root.shadowRoot?.querySelector('div');

    expect(group?.getAttribute('role')).toBe('radiogroup');
    expect(group?.getAttribute('aria-label')).toBe('Required label');
    expect(group).toHaveClass('cat-segmented-control');
  });

  it('propagates size to all segments', async () => {
    const { root, waitForChanges } = await render<HTMLCatSegmentedControlElement>(
      <cat-segmented-control size="xl">
        <cat-segment value="one">Option 1</cat-segment>
        <cat-segment value="two">Option 2</cat-segment>
      </cat-segmented-control>
    );

    await waitForChanges();

    const sizes = Array.from(root.querySelectorAll<HTMLCatSegmentElement>('cat-segment')).map(segment => segment.size);
    expect(sizes).toEqual(['xl', 'xl']);
  });

  it('disables all segments when control is disabled', async () => {
    const { root, waitForChanges } = await render<HTMLCatSegmentedControlElement>(
      <cat-segmented-control disabled>
        <cat-segment value="one">Option 1</cat-segment>
        <cat-segment value="two">Option 2</cat-segment>
      </cat-segmented-control>
    );

    await waitForChanges();

    expect(
      Array.from(root.querySelectorAll<HTMLCatSegmentElement>('cat-segment')).every(segment => segment.disabled)
    ).toBe(true);
  });

  it('restores segments when control is re-enabled', async () => {
    const { root, waitForChanges } = await render<HTMLCatSegmentedControlElement>(
      <cat-segmented-control>
        <cat-segment value="one">Option 1</cat-segment>
        <cat-segment value="two">Option 2</cat-segment>
      </cat-segmented-control>
    );

    await waitForChanges();
    root.disabled = true;
    await waitForChanges();
    root.disabled = false;
    await waitForChanges();

    expect(
      Array.from(root.querySelectorAll<HTMLCatSegmentElement>('cat-segment')).every(segment => !segment.disabled)
    ).toBe(true);
  });

  it('does not prevent arrow-key default when all segments are disabled', async () => {
    const { root, waitForChanges } = await render<HTMLCatSegmentedControlElement>(
      <cat-segmented-control disabled>
        <cat-segment value="one">Option 1</cat-segment>
      </cat-segmented-control>
    );

    await waitForChanges();
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });

    root.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(false);
  });

  it('does not prevent arrow-key default when focus is outside enabled segments', async () => {
    const { root, waitForChanges } = await render<HTMLCatSegmentedControlElement>(
      <cat-segmented-control>
        <cat-segment value="one">Option 1</cat-segment>
      </cat-segmented-control>
    );

    await waitForChanges();
    const segment = root.querySelector<HTMLCatSegmentElement>('cat-segment');
    segment!.doFocus = vi.fn();
    const outside = document.createElement('button');
    document.body.append(outside);
    outside.focus();
    const event = new KeyboardEvent('keydown', { key: 'ArrowRight', bubbles: true, cancelable: true });

    root.dispatchEvent(event);

    expect(event.defaultPrevented).toBe(false);
    expect(segment!.doFocus).not.toHaveBeenCalled();
    outside.remove();
  });

  it('does not emit selection change for focus or blur events', async () => {
    const { root } = await render<HTMLCatSegmentedControlElement>(
      <cat-segmented-control>
        <cat-segment value="one">Option 1</cat-segment>
      </cat-segmented-control>
    );
    const changeListener = vi.fn();
    root.addEventListener('catChange', changeListener);
    const segment = root.querySelector('cat-segment');

    segment?.dispatchEvent(new CustomEvent('catSegmentFocus', { detail: 'one', bubbles: true, composed: true }));
    segment?.dispatchEvent(new CustomEvent('catSegmentBlur', { detail: 'one', bubbles: true, composed: true }));

    expect(changeListener).not.toHaveBeenCalled();
  });
});

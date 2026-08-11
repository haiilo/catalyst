import { describe, expect, it, vi } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';
import './cat-segment';

describe('cat-segment', () => {
  it('renders', async () => {
    const { root } = await render<HTMLCatSegmentElement>(<cat-segment value="testValue">Label</cat-segment>);

    expect(root.innerHTML).toBe('Label');
    expect(root.value).toBe('testValue');
  });

  it('renders button in shadow root', async () => {
    const { root } = await render(<cat-segment value="testValue">Day</cat-segment>);
    const btn = root.shadowRoot?.querySelector('button');

    expect(btn).toHaveClass('cat-segment-m');
    expect(btn).not.toHaveClass('cat-segment-active');
    expect(btn?.getAttribute('aria-pressed')).toBe('false');
  });

  it('applies size class', async () => {
    const { root } = await render(
      <cat-segment value="testValue" size="xl">
        Day
      </cat-segment>
    );
    const btn = root.shadowRoot?.querySelector('button');
    expect(btn).toHaveClass('cat-segment-xl');
  });

  it('applies active class when active', async () => {
    const { root } = await render(
      <cat-segment value="a" active>
        Day
      </cat-segment>
    );
    const btn = root.shadowRoot?.querySelector('button');
    expect(btn).toHaveClass('cat-segment-active');
    expect(btn?.getAttribute('aria-pressed')).toBe('true');
  });

  it('renders disabled attribute when disabled', async () => {
    const { root } = await render(
      <cat-segment value="testValue" disabled>
        Day
      </cat-segment>
    );
    const btn = root.shadowRoot?.querySelector('button');
    expect(btn).toHaveAttribute('disabled');
  });

  it('renders an icon and hides its label in icon-only mode', async () => {
    const { root } = await render(
      <cat-segment value="testValue" icon="check" iconOnly>
        Day
      </cat-segment>
    );
    const btn = root.shadowRoot?.querySelector('button');

    expect(root.shadowRoot?.querySelector('cat-icon')).toBeTruthy();
    expect(root.shadowRoot?.querySelector('.cat-segment-label')).toBeNull();
    expect(btn).toHaveClass('cat-segment-icon-only');
  });

  it('keeps the label when icon-only is set without an icon', async () => {
    const { root } = await render(
      <cat-segment value="testValue" iconOnly>
        Day
      </cat-segment>
    );

    expect(root.shadowRoot?.querySelector('.cat-segment-label')).toBeTruthy();
    expect(root.shadowRoot?.querySelector('button')).not.toHaveClass('cat-segment-icon-only');
  });

  it.each([
    ['xs', 's'],
    ['s', 's'],
    ['m', 's'],
    ['l', 'm'],
    ['xl', 'l']
  ] as const)('maps %s segment size to %s icon size', async (size, iconSize) => {
    const { root } = await render(
      <cat-segment value="testValue" icon="check" size={size}>
        Day
      </cat-segment>
    );

    expect(root.shadowRoot?.querySelector('cat-icon')?.getAttribute('size')).toBe(iconSize);
  });

  it('applies test id and native attributes to the button', async () => {
    const { root } = await render(
      <cat-segment value="testValue" testId="segment" nativeAttributes={{ 'aria-label': 'Day segment', name: 'day' }}>
        Day
      </cat-segment>
    );
    const btn = root.shadowRoot?.querySelector('button');

    expect(btn?.getAttribute('data-test')).toBe('segment');
    expect(btn?.getAttribute('aria-label')).toBe('Day segment');
    expect(btn?.getAttribute('name')).toBe('day');
  });

  it('emits its value when an inactive segment is clicked', async () => {
    const { root } = await render(<cat-segment value="day">Day</cat-segment>);
    const listener = vi.fn();
    root.addEventListener('catSegmentClick', listener);

    root.shadowRoot?.querySelector<HTMLButtonElement>('button')?.click();

    expect(listener).toHaveBeenCalledOnce();
    expect(listener.mock.calls[0][0]).toMatchObject({ detail: 'day' });
  });

  it.each([
    ['active', { active: true }],
    ['disabled', { disabled: true }]
  ] as const)('does not emit when clicked while %s', async (_state, props) => {
    const { root } = await render(
      <cat-segment value="day" {...props}>
        Day
      </cat-segment>
    );
    const listener = vi.fn();
    root.addEventListener('catSegmentClick', listener);

    root.shadowRoot?.querySelector<HTMLButtonElement>('button')?.click();

    expect(listener).not.toHaveBeenCalled();
  });

  it('updates button state when mutable props change', async () => {
    const { root, waitForChanges } = await render<HTMLCatSegmentElement>(<cat-segment value="day">Day</cat-segment>);

    root.active = true;
    root.size = 'xl';
    root.disabled = true;
    await waitForChanges();

    const btn = root.shadowRoot?.querySelector('button');
    expect(btn).toHaveClasses(['cat-segment-active', 'cat-segment-xl']);
    expect(btn?.getAttribute('aria-pressed')).toBe('true');
    expect(btn).toHaveAttribute('disabled');
  });

  it('focuses and blurs its native button through public methods', async () => {
    const { root } = await render<HTMLCatSegmentElement>(<cat-segment value="day">Day</cat-segment>);
    const btn = root.shadowRoot?.querySelector<HTMLButtonElement>('button');
    const focus = vi.spyOn(btn!, 'focus');
    const blur = vi.spyOn(btn!, 'blur');

    await root.doFocus();
    expect(focus).toHaveBeenCalledOnce();

    await root.doBlur();
    expect(blur).toHaveBeenCalledOnce();
  });

  it('emits focus and blur events with its value', async () => {
    const { root } = await render(<cat-segment value="day">Day</cat-segment>);
    const focusListener = vi.fn();
    const blurListener = vi.fn();
    root.addEventListener('catSegmentFocus', focusListener);
    root.addEventListener('catSegmentBlur', blurListener);

    root.shadowRoot?.querySelector<HTMLButtonElement>('button')?.focus();
    expect(focusListener).toHaveBeenCalledOnce();
    expect(focusListener.mock.calls[0][0]).toMatchObject({ detail: 'day' });

    root.shadowRoot?.querySelector<HTMLButtonElement>('button')?.blur();
    expect(blurListener).toHaveBeenCalledOnce();
    expect(blurListener.mock.calls[0][0]).toMatchObject({ detail: 'day' });
  });

  it('sets aria-label', async () => {
    const { root } = await render<HTMLCatSegmentElement>(
      <cat-segment value="day" a11yLabel="Test aria label">
        Day
      </cat-segment>
    );
    const btn = root.shadowRoot?.querySelector<HTMLButtonElement>('button');
    expect(btn?.getAttribute('aria-label')).toBe('Test aria label');
  });

  it('sets aria-controls', async () => {
    const { root } = await render<HTMLCatSegmentElement>(
      <cat-segment value="day" a11yControls="panel1">
        Day
      </cat-segment>
    );
    const btn = root.shadowRoot?.querySelector<HTMLButtonElement>('button');
    expect(btn?.getAttribute('aria-controls')).toBe('panel1');
  });
});

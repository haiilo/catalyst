import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';
import { userEvent } from '@vitest/browser/context';

describe('cat-toggle', () => {
  it('renders', async () => {
    const { root } = await render(<cat-toggle label="Label" />);
    await expect.element(root).toHaveClass('hydrated');
  });

  it('should toggle on state on click', async () => {
    const { root, spyOnEvent } = await render(<cat-toggle label="Enable feature" />);
    const catChange = spyOnEvent('catChange');
    await userEvent.click(root);
    expect(catChange).toHaveReceivedEvent();
    expect((root as HTMLCatToggleElement).checked).toBe(true);
  });

  it('should start as checked when checked attribute is set', async () => {
    const { root } = await render(<cat-toggle label="Pre-enabled" checked />);
    expect((root as HTMLCatToggleElement).checked).toBe(true);
  });

  it('should not toggle when disabled', async () => {
    const { root, spyOnEvent } = await render(<cat-toggle label="Disabled" disabled />);
    const catChange = spyOnEvent('catChange');
    await userEvent.click(root);
    expect(catChange).not.toHaveReceivedEvent();
  });

  it('should toggle from on to off', async () => {
    const { root } = await render(<cat-toggle label="Toggle" checked />);
    await userEvent.click(root);
    expect((root as HTMLCatToggleElement).checked).toBe(false);
  });

  it('should display label text', async () => {
    const { root } = await render(<cat-toggle label="My Toggle" />);
    expect((root as HTMLCatToggleElement).label).toBe('My Toggle');
  });

  it('should have required attribute', async () => {
    const { root } = await render(<cat-toggle label="Required" required />);
    expect((root as HTMLCatToggleElement).required).toBe(true);
  });

  it('should have hint text', async () => {
    const { root } = await render(<cat-toggle label="Toggle" hint="Helper text" />);
    expect((root as HTMLCatToggleElement).hint).toBe('Helper text');
  });

  it('should display label on left when labelLeft is true', async () => {
    const { root } = await render(<cat-toggle label="Left Label" labelLeft />);
    expect((root as HTMLCatToggleElement).labelLeft).toBe(true);
  });

  it('should handle keyboard interaction - Space key', async () => {
    const { root, spyOnEvent } = await render(<cat-toggle label="Keyboard" />);
    const catChange = spyOnEvent('catChange');
    root.focus();
    await userEvent.keyboard(' ');
    expect(catChange).toHaveReceivedEvent();
  });
});

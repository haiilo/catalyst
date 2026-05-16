import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';
import { userEvent } from '@vitest/browser/context';

describe('cat-checkbox', () => {
  it('renders', async () => {
    const { root } = await render(<cat-checkbox label="Label" />);
    await expect.element(root).toHaveClass('hydrated');
  });

  it('should toggle checked state on click', async () => {
    const { root, spyOnEvent } = await render(<cat-checkbox label="Accept terms" />);
    const catChange = spyOnEvent('catChange');
    await userEvent.click(root);
    expect(catChange).toHaveReceivedEvent();
    expect((root as HTMLCatCheckboxElement).checked).toBe(true);
  });

  it('should start as checked when checked attribute is set', async () => {
    const { root } = await render(<cat-checkbox label="Pre-checked" checked />);
    expect((root as HTMLCatCheckboxElement).checked).toBe(true);
  });

  it('should not toggle when disabled', async () => {
    const { root, spyOnEvent } = await render(<cat-checkbox label="Disabled" disabled />);
    const catChange = spyOnEvent('catChange');
    await userEvent.click(root);
    expect(catChange).not.toHaveReceivedEvent();
  });

  it('should toggle from checked to unchecked', async () => {
    const { root } = await render(<cat-checkbox label="Toggle" checked />);
    await userEvent.click(root);
    expect((root as HTMLCatCheckboxElement).checked).toBe(false);
  });

  it('should work with indeterminate state', async () => {
    const { root } = await render(<cat-checkbox label="Indeterminate" indeterminate />);
    expect((root as HTMLCatCheckboxElement).indeterminate).toBe(true);
  });

  it('should display label text', async () => {
    const { root } = await render(<cat-checkbox label="My Label" />);
    expect((root as HTMLCatCheckboxElement).label).toBe('My Label');
  });

  it('should have required attribute', async () => {
    const { root } = await render(<cat-checkbox label="Required" required />);
    expect((root as HTMLCatCheckboxElement).required).toBe(true);
  });

  it('should have hint text', async () => {
    const { root } = await render(<cat-checkbox label="Checkbox" hint="Helper text" />);
    expect((root as HTMLCatCheckboxElement).hint).toBe('Helper text');
  });
});

import { describe, it, expect } from 'vitest';
import { render, h } from '@stencil/vitest';
import { userEvent } from '@vitest/browser/context';

describe('cat-input', () => {
  it('renders', async () => {
    const { root } = await render(<cat-input label="Label" />);
    await expect.element(root).toHaveClass('hydrated');
  });

  it('should input type="number" allow typing numeric characters', async () => {
    const { root } = await render(<cat-input type="number" />);
    const input = root.shadowRoot!.querySelector('input') as HTMLInputElement;
    // Entering a mix of allowed and disallowed characters
    await userEvent.type(input, '1a2.1@#');
    expect(input.value).toBe('12.1');
  });

  it('should accept text input and emit catChange event', async () => {
    const { root, spyOnEvent } = await render(<cat-input value="" />);
    const input = root.shadowRoot!.querySelector('input') as HTMLInputElement;
    const catChange = spyOnEvent('catChange');
    await userEvent.type(input, 'H');
    await userEvent.type(input, 'e');
    await userEvent.type(input, 'l');
    await userEvent.type(input, 'l');
    await userEvent.type(input, 'o');
    expect(catChange).toHaveReceivedEventTimes(5);
    expect(input.value).toBe('Hello');
  });

  it('should trigger focus event', async () => {
    const { root } = await render(<cat-input />);
    const input = root.shadowRoot!.querySelector('input') as HTMLInputElement;
    input.focus();
    expect(document.activeElement).toBe(root);
  });

  it('should not accept input when disabled', async () => {
    const { root, spyOnEvent } = await render(<cat-input disabled />);
    const input = root.shadowRoot!.querySelector('input') as HTMLInputElement;
    const catChange = spyOnEvent('catChange');
    await userEvent.type(input, 'a');
    expect(catChange).not.toHaveReceivedEvent();
  });

  it('should display error state', async () => {
    const { root } = await render(<cat-input errors={["Field is required"]} />);
    expect((root as HTMLCatInputElement).errors).toEqual(['Field is required']);
  });

  it('should clear input value', async () => {
    const { root } = await render(<cat-input value="test" clearable />);
    await (root as HTMLCatInputElement).clear();
    const input = root.shadowRoot!.querySelector('input') as HTMLInputElement;
    await expect.element(input).toHaveValue('');
  });

  it('should work as password field', async () => {
    const { root } = await render(<cat-input type="password" />);
    const input = root.shadowRoot!.querySelector('input') as HTMLInputElement;
    expect(input.getAttribute('type')).toBe('password');
  });

  it('should work as email field', async () => {
    const { root } = await render(<cat-input type="email" />);
    const input = root.shadowRoot!.querySelector('input') as HTMLInputElement;
    expect(input.getAttribute('type')).toBe('email');
  });
});

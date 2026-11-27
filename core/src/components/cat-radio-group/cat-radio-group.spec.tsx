import { describe, it, expect } from 'vitest';
import { render } from '@stencil/vitest';
import { h } from '@stencil/core';
import './cat-radio-group';

describe('cat-radio-group', () => {
  it('renders', async () => {
    const { root } = await render(<cat-radio-group />);
    await expect(root).toEqualLightHtml(`
      <cat-radio-group class="hydrated"></cat-radio-group>
    `);
  });

  it('renders testId as data-test on the radio group', async () => {
    const { root } = await render<HTMLCatRadioGroupElement>(<cat-radio-group testId="test-id" />);
    const group = root.shadowRoot?.querySelector('[role="radiogroup"]');

    expect(group?.getAttribute('data-test')).toBe('test-id');
  });

  it('does not render data-test without testId', async () => {
    const { root } = await render<HTMLCatRadioGroupElement>(<cat-radio-group />);
    const group = root.shadowRoot?.querySelector('[role="radiogroup"]');

    expect(group?.hasAttribute('data-test')).toBe(false);
  });
});

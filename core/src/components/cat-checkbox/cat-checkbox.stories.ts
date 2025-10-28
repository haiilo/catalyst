import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

/**
 * Checkboxes are used to let a user choose one or more options from a limited
 * number of options.
 */
const meta: Meta = {
  title: 'Components/Checkbox',
  component: 'cat-checkbox',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'Label of the checkbox',
    },
    checked: {
      control: { type: 'boolean' },
      description: 'Checked state of the checkbox',
    },
    indeterminate: {
      control: { type: 'boolean' },
      description: 'Indeterminate state of the checkbox',
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Disabled state of the checkbox',
    },
    required: {
      control: { type: 'boolean' },
      description: 'Required state of the checkbox',
    },
  },
  args: {
    label: 'Checkbox label',
    checked: false,
    indeterminate: false,
    disabled: false,
    required: false,
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default checkbox
 */
export const Primary: Story = {
  args: {
    label: 'I agree to the terms and conditions',
  },
  render: (args) => html`
    <cat-checkbox
      label="${args.label}"
      ?checked="${args.checked}"
      ?indeterminate="${args.indeterminate}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
    ></cat-checkbox>
  `,
};

/**
 * Checkbox states
 */
export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <cat-checkbox label="Unchecked"></cat-checkbox>
      <cat-checkbox label="Checked" checked></cat-checkbox>
      <cat-checkbox label="Indeterminate" indeterminate></cat-checkbox>
      <cat-checkbox label="Disabled" disabled></cat-checkbox>
      <cat-checkbox label="Checked & Disabled" checked disabled></cat-checkbox>
      <cat-checkbox label="Required" required></cat-checkbox>
    </div>
  `,
};

/**
 * Checkbox group
 */
export const Group: Story = {
  render: () => html`
    <fieldset style="border: none; padding: 0; margin: 0;">
      <legend style="margin-bottom: 1rem; font-weight: bold;">Select your interests:</legend>
      <div style="display: flex; flex-direction: column; gap: 0.5rem;">
        <cat-checkbox label="Technology"></cat-checkbox>
        <cat-checkbox label="Design"></cat-checkbox>
        <cat-checkbox label="Marketing"></cat-checkbox>
        <cat-checkbox label="Sales"></cat-checkbox>
      </div>
    </fieldset>
  `,
};

/**
 * With hints
 */
export const WithHints: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <cat-checkbox label="Subscribe to newsletter">
        <span slot="hint">We'll send you weekly updates</span>
      </cat-checkbox>
      <cat-checkbox label="I agree to the privacy policy" required>
        <span slot="hint">Required to continue</span>
      </cat-checkbox>
    </div>
  `,
};

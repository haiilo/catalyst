import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

/**
 * Inputs are used to allow users to provide text input when the expected input
 * is short. Supports various types including passwords, numbers, email, etc.
 */
const meta: Meta = {
  title: 'Components/Input',
  component: 'cat-input',
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: { type: 'text' },
      description: 'The label for the input'
    },
    placeholder: {
      control: { type: 'text' },
      description: 'Placeholder text'
    },
    value: {
      control: { type: 'text' },
      description: 'The input value'
    },
    type: {
      control: { type: 'select' },
      options: ['text', 'email', 'password', 'number', 'tel', 'url', 'search'],
      description: 'The input type'
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Whether the input is disabled'
    },
    required: {
      control: { type: 'boolean' },
      description: 'Whether the input is required'
    },
    readonly: {
      control: { type: 'boolean' },
      description: 'Whether the input is readonly'
    }
  },
  args: {
    label: 'Label',
    placeholder: 'Enter text...',
    type: 'text',
    disabled: false,
    required: false,
    readonly: false
  }
};

export default meta;
type Story = StoryObj;

/**
 * Default text input
 */
export const Primary: Story = {
  args: {
    label: 'First Name',
    placeholder: 'Enter your first name'
  },
  render: args => html`
    <cat-input
      label="${args.label}"
      placeholder="${args.placeholder}"
      value="${args.value || ''}"
      type="${args.type}"
      ?disabled="${args.disabled}"
      ?required="${args.required}"
      ?readonly="${args.readonly}"
    ></cat-input>
  `
};

/**
 * Different input types
 */
export const Types: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <cat-input label="Text" type="text" placeholder="Enter text"></cat-input>
      <cat-input label="Email" type="email" placeholder="email@example.com"></cat-input>
      <cat-input label="Password" type="password" placeholder="Enter password"></cat-input>
      <cat-input label="Number" type="number" placeholder="0"></cat-input>
      <cat-input label="Telephone" type="tel" placeholder="+1 (555) 123-4567"></cat-input>
      <cat-input label="URL" type="url" placeholder="https://example.com"></cat-input>
      <cat-input label="Search" type="search" placeholder="Search..."></cat-input>
    </div>
  `
};

/**
 * Input states
 */
export const States: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <cat-input label="Normal" placeholder="Normal state"></cat-input>
      <cat-input label="With Value" value="Some text"></cat-input>
      <cat-input label="Required" required placeholder="Required field"></cat-input>
      <cat-input label="Disabled" disabled placeholder="Disabled input"></cat-input>
      <cat-input label="Readonly" readonly value="Readonly value"></cat-input>
    </div>
  `
};

/**
 * With hints and validation
 */
export const WithHints: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem; max-width: 400px;">
      <cat-input label="Username" placeholder="Enter username">
        <span slot="hint">Must be at least 3 characters</span>
      </cat-input>
      <cat-input label="Email" type="email" placeholder="email@example.com">
        <span slot="hint">We'll never share your email</span>
      </cat-input>
    </div>
  `
};

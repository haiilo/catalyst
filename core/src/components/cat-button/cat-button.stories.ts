import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

// Get auto-generated args, argTypes, and template from the manifest
const { args, argTypes, template } = getStorybookHelpers('cat-button');

/**
 * Buttons are used for interface actions. Primary style should be used only
 * once per view for main call-to-action.
 */
const meta: Meta = {
  title: 'Components/Button',
  component: 'cat-button',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  // Use auto-generated args and argTypes
  args,
  argTypes
};

export default meta;
type Story = StoryObj;

/**
 * Default button example with interactive controls.
 * The template() helper automatically binds all props from args.
 */
export const Primary: Story = {
  args: {
    variant: 'filled',
    color: 'primary'
  },
  // Use the template helper - it auto-generates the component with all args
  render: args => html`${template(args, html`Click Me`)}`
};

/**
 * All button variants displayed together
 */
export const AllVariants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <cat-button variant="filled">Filled</cat-button>
      <cat-button variant="outlined">Outlined</cat-button>
      <cat-button variant="text">Text</cat-button>
      <cat-button variant="link">Link</cat-button>
    </div>
  `
};

/**
 * All color palettes for buttons
 */
export const AllColors: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; flex-direction: column; max-width: 500px;">
      <cat-button variant="filled" color="primary">Primary</cat-button>
      <cat-button variant="filled" color="secondary">Secondary</cat-button>
      <cat-button variant="filled" color="info">Info</cat-button>
      <cat-button variant="filled" color="success">Success</cat-button>
      <cat-button variant="filled" color="warning">Warning</cat-button>
      <cat-button variant="filled" color="danger">Danger</cat-button>
    </div>
  `
};

/**
 * All available sizes for buttons
 */
export const AllSizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <cat-button size="xs">Extra Small</cat-button>
      <cat-button size="s">Small</cat-button>
      <cat-button size="m">Medium</cat-button>
      <cat-button size="l">Large</cat-button>
      <cat-button size="xl">Extra Large</cat-button>
    </div>
  `
};

/**
 * Button states: disabled and loading
 */
export const States: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-direction: column; max-width: 300px;">
      <cat-button variant="filled" color="primary">Normal</cat-button>
      <cat-button variant="filled" color="primary" active>Active</cat-button>
      <cat-button variant="filled" color="primary" disabled>Disabled</cat-button>
      <cat-button variant="filled" color="primary" loading>Loading</cat-button>
    </div>
  `
};

import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';
import { getStorybookHelpers } from '@wc-toolkit/storybook-helpers';

// Get auto-generated args, argTypes, and template from the manifest
const { args, argTypes, template } = getStorybookHelpers('cat-button');

/**
 * Description of button page
 */
const meta: Meta = {
  title: 'Components/Button',
  component: 'cat-button',
  tags: ['autodocs'],
  parameters: {
    layout: 'centered'
  },
  // dynamic definition coming from custom element manifest
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
  render: args => html`${template(args, html`Click Me`)}`
};


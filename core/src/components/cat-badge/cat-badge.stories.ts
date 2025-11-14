import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

/**
 * Badges are used to inform users of the status of an object or of an action
 * that's been taken.
 */
const meta: Meta = {
  title: 'Components/Badge',
  component: 'cat-badge',
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['filled', 'outlined'],
      description: 'The rendering style of the badge'
    },
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'info', 'success', 'warning', 'danger'],
      description: 'The color palette of the badge'
    },
    size: {
      control: { type: 'select' },
      options: ['xs', 's', 'm', 'l', 'xl'],
      description: 'The size of the badge'
    },
    round: {
      control: { type: 'boolean' },
      description: 'Use round badge edges'
    },
    pulse: {
      control: { type: 'boolean' },
      description: 'Draw attention with a subtle animation'
    }
  },
  args: {
    variant: 'filled',
    color: 'primary',
    size: 'm',
    round: false,
    pulse: false
  }
};

export default meta;
type Story = StoryObj;

/**
 * Default badge
 */
export const Primary: Story = {
  args: {
    color: 'primary'
  },
  render: args => html`
    <cat-badge
      variant="${args.variant}"
      color="${args.color}"
      size="${args.size}"
      ?round="${args.round}"
      ?pulse="${args.pulse}"
    >
      Badge
    </cat-badge>
  `
};

/**
 * All badge variants
 */
export const Variants: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <cat-badge variant="filled">Filled</cat-badge>
      <cat-badge variant="outlined">Outlined</cat-badge>
    </div>
  `
};

/**
 * All badge colors
 */
export const Colors: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; flex-wrap: wrap; align-items: center;">
      <cat-badge color="primary">Primary</cat-badge>
      <cat-badge color="secondary">Secondary</cat-badge>
      <cat-badge color="info">Info</cat-badge>
      <cat-badge color="success">Success</cat-badge>
      <cat-badge color="warning">Warning</cat-badge>
      <cat-badge color="danger">Danger</cat-badge>
    </div>
  `
};

/**
 * All badge sizes
 */
export const Sizes: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <cat-badge size="xs">XS</cat-badge>
      <cat-badge size="s">Small</cat-badge>
      <cat-badge size="m">Medium</cat-badge>
      <cat-badge size="l">Large</cat-badge>
      <cat-badge size="xl">XL</cat-badge>
    </div>
  `
};

/**
 * Round badges
 */
export const Round: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <cat-badge round>1</cat-badge>
      <cat-badge round>99</cat-badge>
      <cat-badge round color="danger">!</cat-badge>
      <cat-badge round color="success">✓</cat-badge>
    </div>
  `
};

/**
 * Pulse animation for attention
 */
export const Pulse: Story = {
  render: () => html`
    <div style="display: flex; gap: 1rem; align-items: center;">
      <cat-badge pulse color="danger">New</cat-badge>
      <cat-badge pulse color="warning">Alert</cat-badge>
      <cat-badge pulse color="success">Live</cat-badge>
    </div>
  `
};

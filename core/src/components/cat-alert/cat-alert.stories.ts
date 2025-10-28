import type { Meta, StoryObj } from '@storybook/web-components';
import { html } from 'lit';

/**
 * Informs user about important changes or conditions in the interface. Use this
 * component if you need to capture user's attention in a prominent way.
 */
const meta: Meta = {
  title: 'Components/Alert',
  component: 'cat-alert',
  tags: ['autodocs'],
  argTypes: {
    color: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'success', 'warning'],
      description: 'The color palette of the alert',
    },
    noIcon: {
      control: { type: 'boolean' },
      description: 'Whether the icon is deactivated',
    },
    icon: {
      control: { type: 'text' },
      description: 'Custom icon name',
    },
  },
  args: {
    color: 'primary',
    noIcon: false,
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default alert
 */
export const Primary: Story = {
  args: {
    color: 'primary',
  },
  render: (args) => html`
    <cat-alert color="${args.color}" ?no-icon="${args.noIcon}" icon="${args.icon || ''}">
      This is a primary alert message.
    </cat-alert>
  `,
};

/**
 * All alert colors
 */
export const Colors: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <cat-alert color="primary">
        <strong>Primary:</strong> General information or neutral messages.
      </cat-alert>
      <cat-alert color="secondary">
        <strong>Secondary:</strong> Secondary information or less important messages.
      </cat-alert>
      <cat-alert color="success">
        <strong>Success:</strong> Operation completed successfully.
      </cat-alert>
      <cat-alert color="warning">
        <strong>Warning:</strong> Caution - potential issue detected.
      </cat-alert>
      <cat-alert color="danger">
        <strong>Danger:</strong> Error - action failed or critical issue.
      </cat-alert>
    </div>
  `,
};

/**
 * Alert without icon
 */
export const NoIcon: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <cat-alert color="primary" no-icon>
        This alert has no icon displayed.
      </cat-alert>
      <cat-alert color="success" no-icon>
        Success message without icon.
      </cat-alert>
    </div>
  `,
};

/**
 * Alerts with rich content
 */
export const RichContent: Story = {
  render: () => html`
    <div style="display: flex; flex-direction: column; gap: 1rem;">
      <cat-alert color="info">
        <h4 style="margin: 0 0 0.5rem 0;">Information</h4>
        <p style="margin: 0;">
          This alert contains multiple paragraphs and formatting.
          You can include any HTML content inside the alert component.
        </p>
      </cat-alert>
      <cat-alert color="warning">
        <strong>Warning:</strong> Your session will expire in 5 minutes.
        <br />
        <a href="#" style="color: inherit; text-decoration: underline;">Extend session</a>
      </cat-alert>
    </div>
  `,
};

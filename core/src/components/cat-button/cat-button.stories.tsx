import { Story } from '@storybook/web-components';
import { html } from 'lit-html';

export default {
  title: 'Elements/Button',
  component: 'cat-button',
  argTypes: {
    catFocus: { action: 'catFocus' },
    size: {
      control: { type: 'select' },
      options: ['xs', 's', 'm', 'l', 'xl']
    }
  }
};

// https://storybook.js.org/docs/react/writing-docs/doc-blocks#customizing
// https://storybook.js.org/docs/react/api/argtypes
// prettier-ignore
const Template: Story = ({ size }) => html`
<cat-button size=${size}>
  Button
</cat-button>`;

export const Button = Template.bind({});
Button.args = {
  size: 'm'
};

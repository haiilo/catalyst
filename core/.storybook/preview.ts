import { defineCustomElements } from '../loader/index.js';
// Import global styles
import '../dist/catalyst/catalyst.css';

// Load web components
defineCustomElements();

const preview = {
  parameters: {
    actions: { argTypesRegex: '^cat[A-Z].*' },
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
};

export default preview;

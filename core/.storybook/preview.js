import { setCustomElementsManifest } from '@storybook/web-components';
import customElements from '../dist/custom-elements/custom-elements.json';
import { defineCustomElements } from '../loader';

setCustomElementsManifest(customElements);

defineCustomElements();

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  layout: 'centered',
  backgrounds: {
    values: [
      {
        name: 'light',
        value: '#f2f3f4'
      },
      {
        name: 'dark',
        value: '#101d30'
      }
    ]
  },
  a11y: {
    options: {
      runOnly: {
        type: 'tag',
        values: ['wcag2a', 'wcag2aa']
      }
    }
  },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};

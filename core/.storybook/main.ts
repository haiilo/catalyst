import type { StorybookConfig } from '@storybook/web-components-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-links', '@storybook/addon-essentials', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/web-components-vite',
    options: {}
  },
  docs: {
    autodocs: 'tag'
  },
  viteFinal: async (config, { configType }) => {
    // Only set base path for production (GitHub Pages subdirectory)
    if (configType === 'PRODUCTION') {
      config.base = '/catalyst/storybook/';
    }
    return config;
  }
};

export default config;

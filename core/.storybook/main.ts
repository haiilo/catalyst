import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import type { StorybookConfig } from '@storybook/web-components-vite';

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    getAbsolutePath('@storybook/addon-links'),
    getAbsolutePath('@storybook/addon-a11y'),
    getAbsolutePath('@storybook/addon-docs')
  ],

  framework: {
    name: getAbsolutePath('@storybook/web-components-vite'),
    options: {}
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

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}

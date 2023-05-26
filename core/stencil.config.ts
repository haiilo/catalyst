import { angularOutputTarget, ValueAccessorConfig } from '@stencil/angular-output-target';
import { Config } from '@stencil/core';
import { reactOutputTarget } from '@stencil/react-output-target';
import { sass } from '@stencil/sass';
import { vueOutputTarget } from '@stencil/vue-output-target';
import { existsSync } from 'fs';
import { inlineSvg } from 'stencil-inline-svg';

function getAssetsTokensPath() {
  const assetsTokensPath = './node_modules/@haiilo/catalyst-tokens/assets';
  return existsSync(assetsTokensPath) ? '.' + assetsTokensPath : '../.' + assetsTokensPath;
}

function getAssetsIconsPath() {
  const assetsTokensPath = './node_modules/@haiilo/catalyst-icons/dist';
  return existsSync(assetsTokensPath) ? '.' + assetsTokensPath : '../.' + assetsTokensPath;
}

const angularValueAccessorBindings: ValueAccessorConfig[] = [
  {
    elementSelectors: ['cat-input', 'cat-textarea'],
    event: 'catChange',
    targetAttr: 'value',
    type: 'text'
  },
  {
    elementSelectors: ['cat-checkbox', 'cat-toggle'],
    event: 'catChange',
    targetAttr: 'value',
    type: 'boolean'
  },
  {
    elementSelectors: ['cat-radio', 'cat-radio-group'],
    event: 'catChange',
    targetAttr: 'value',
    type: 'radio'
  },
  {
    elementSelectors: ['cat-select'],
    event: 'catChange',
    targetAttr: 'value',
    type: 'select'
  }
];

export const config: Config = {
  namespace: 'catalyst',
  plugins: [
    inlineSvg(),
    sass({
      includePaths: ['src/styles', 'node_modules', '../node_modules']
    })
  ],
  sourceMap: true,
  globalStyle: 'src/styles/index.scss',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        {
          src: './styles',
          dest: './scss'
        },
        {
          src: getAssetsTokensPath(),
          dest: 'assets'
        },
        {
          src: './index.cdn.js',
          warn: true
        }
      ]
    },
    {
      type: 'dist-custom-elements'
    },
    {
      type: 'docs-readme',
      footer: 'Made with love in Hamburg, Germany',
      strict: true
    },
    {
      type: 'www',
      serviceWorker: null, // disable service workers
      copy: [
        {
          src: getAssetsTokensPath(),
          dest: 'build/assets'
        },
        {
          src: getAssetsIconsPath(),
          dest: 'build/assets/icons'
        }
      ]
    },
    angularOutputTarget({
      componentCorePackage: '@haiilo/catalyst',
      directivesProxyFile: '../angular/projects/catalyst/src/lib/directives/proxies.ts',
      valueAccessorConfigs: angularValueAccessorBindings
    }),
    reactOutputTarget({
      componentCorePackage: '@haiilo/catalyst',
      proxiesFile: '../react/src/components/stencil-generated/index.ts'
    }),
    vueOutputTarget({
      componentCorePackage: '@haiilo/catalyst',
      proxiesFile: '../vue/src/components.ts'
    })
  ],
  testing: {
    setupFiles: ['./setupTests.js'],
    transform: {
      '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': './stencil.transformer.js'
    },
    transformIgnorePatterns: ['\\/node_modules\\/(?!(@haiilo\\/catalyst-icons\\/tmp))']
  }
};

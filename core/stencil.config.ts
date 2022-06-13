import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';
import { existsSync } from 'fs';

function getAssetsTokensPath() {
  const assetsTokensPath = './node_modules/@haiilo/catalyst-tokens/assets';
  return existsSync(assetsTokensPath) ? '.' + assetsTokensPath : '../.' + assetsTokensPath;
}

export const config: Config = {
  namespace: 'catalyst',
  plugins: [
    sass({
      includePaths: ['src/styles']
    })
  ],
  sourceMap: true,
  globalScript: 'src/init.ts',
  globalStyle: 'src/styles/index.scss',
  outputTargets: [
    {
      type: 'dist',
      esmLoaderPath: '../loader',
      copy: [
        {
          src: getAssetsTokensPath(),
          dest: 'styles/fonts/assets'
        },
        {
          src: './index.cdn.js',
          warn: true
        },
        {
          src: 'styles',
          dest: 'styles'
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
        }
      ]
    },
    angularOutputTarget({
      componentCorePackage: '@haiilo/catalyst',
      directivesProxyFile: '../angular/projects/catalyst/src/lib/directives/proxies.ts'
    }),
    reactOutputTarget({
      componentCorePackage: '@haiilo/catalyst',
      proxiesFile: '../react/src/components/stencil-generated/index.ts'
    }),
    vueOutputTarget({
      componentCorePackage: '@haiilo/catalyst',
      proxiesFile: '../vue/src/components.ts'
    })
  ]
};

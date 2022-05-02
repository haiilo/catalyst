import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { angularOutputTarget } from '@stencil/angular-output-target';
import { reactOutputTarget } from '@stencil/react-output-target';
import { vueOutputTarget } from '@stencil/vue-output-target';

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
          src: '../../node_modules/@haiilo/catalyst-tokens/assets',
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
          src: '../../node_modules/@haiilo/catalyst-tokens/assets',
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

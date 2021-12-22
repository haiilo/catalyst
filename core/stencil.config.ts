import { Config } from '@stencil/core';
import { sass } from '@stencil/sass';
import { angularOutputTarget } from '@stencil/angular-output-target';


export const config: Config = {
  namespace: 'catalyst',
  plugins: [sass()],
  globalStyle: 'src/styles/index.scss',
  outputTargets: [
    angularOutputTarget({
      componentCorePackage: '@coyoapp/catalyst',
      directivesProxyFile: '../angular/projects/catalyst/src/lib/directives/proxies.ts',
    }),
    {
      type: 'dist',
      esmLoaderPath: '../loader'
    },
    {
      type: 'dist-custom-elements-bundle'
    },
    {
      type: 'docs-readme'
    },
    {
      type: 'www',
      serviceWorker: null // disable service workers
    }
  ]
};

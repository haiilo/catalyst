'use strict'

const fs = require('fs');

fs.writeFileSync('tmp/public-api.ts', `
  export * from './icons.constants';
  export * from './icons.object';
`);

fs.writeFileSync('tmp/index.ts', `
  export * from './public-api';
`);

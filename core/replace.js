const replace = require('replace-in-file');

const results = replace.sync({
  files: 'dist/catalyst/scss/**/*.scss',
  from: /@(import|use|forward) '~/g,
  to: '@$1 \'',
});

const output = results
  .filter(result => result.hasChanged)
  .map(result => `  - ${result.file}`)
  .join('\n');

console.info('\x1b[32m%s\x1b[0m', `Replaced SCSS '~' imports in\n${output}`);

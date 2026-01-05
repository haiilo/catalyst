const { createJestStencilPreset } = require('jest-stencil-runner');

module.exports = createJestStencilPreset({
  rootDir: __dirname,
  // Add any additional Jest configuration here
  setupFiles: ['./setupTests.js'],
  browserHeadless: 'shell',
  browserArgs: ['--no-sandbox', '--disable-setuid-sandbox'],
  transform: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': './stencil.transformer.js'
  },
  transformIgnorePatterns: ['node_modules/(?!(?:.pnpm/)?(@haiilo))']
});

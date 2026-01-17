const { createJestStencilPreset } = require('jest-stencil-runner');

const basePreset = createJestStencilPreset({
  rootDir: __dirname,
  setupFiles: ['./setupTests.js'],
  transformIgnorePatterns: ['node_modules/(?!(?:.pnpm/)?(@haiilo))']
});

module.exports = {
  ...basePreset,
  transform: {
    ...basePreset.transform,
    // Asset transformer for non-code files
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': './stencil.transformer.js'
  }
};

// Note: E2E tests (.e2e.ts) should be run separately via Stencil's test runner:
//   stencil test --e2e
// The jest-stencil-runner only supports spec tests with newSpecPage().

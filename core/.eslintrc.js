const OFF = 0,
  WARN = 1,
  ERROR = 2;

module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier', 'plugin:storybook/recommended'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname
  },
  plugins: ['@typescript-eslint'],
  rules: {
    // quickfix: 'h' is defined but never used
    '@typescript-eslint/no-unused-vars': [WARN, { varsIgnorePattern: '^h$' }],
    // Allow importing @storybook/web-components for setCustomElementsManifest
    'storybook/no-renderer-packages': OFF
  }
};

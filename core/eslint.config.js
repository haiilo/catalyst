const { defineConfig, globalIgnores } = require('eslint/config');

const globals = require('globals');
const tsParser = require('@typescript-eslint/parser');
const typescriptEslint = require('@typescript-eslint/eslint-plugin');
const js = require('@eslint/js');

const { FlatCompat } = require('@eslint/eslintrc');

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});
const WARN = 1,
  ERROR = 2;

module.exports = defineConfig([
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      globals: {
        ...globals.browser
      },

      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module',

      parserOptions: {
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname
      }
    },

    extends: compat.extends('eslint:recommended', 'plugin:@typescript-eslint/recommended', 'prettier'),

    plugins: {
      '@typescript-eslint': typescriptEslint
    },

    rules: {
      '@typescript-eslint/no-unused-vars': [
        WARN,
        {
          varsIgnorePattern: '^h$'
        }
      ],
      '@typescript-eslint/no-unused-expressions': [
        ERROR,
        {
          allowTernary: true,
          allowShortCircuit: true
        }
      ]
    }
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      ecmaVersion: 'latest',
      sourceType: 'module'
    },
    extends: compat.extends('eslint:recommended', 'prettier')
  },
  globalIgnores([
    '**/__mocks__',
    '**/dist',
    '**/loader',
    '**/coverage',
    '**/node_modules',
    '**/www',
    '**/.eslintrc.js',
    '**/eslint.config.js',
    '**/replace.js',
    '**/setupTests.js',
    '**/stencil.config.ts',
    '**/stencil.transformer.js'
  ])
]);

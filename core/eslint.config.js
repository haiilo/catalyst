import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tsParser from '@typescript-eslint/parser';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all
});
const WARN = 1,
  ERROR = 2;

export default defineConfig([
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
    '**/stencil.config.ts',
    '**/playwright.config.ts',
    '**/vitest-setup-plugin.ts',
    '**/vitest.config.ts'
  ])
]);

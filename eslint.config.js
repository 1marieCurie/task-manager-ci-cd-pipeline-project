import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),

  // General JavaScript rules
  {
    files: ['**/*.{js,jsx}'],
    extends: [js.configs.recommended],
  },

  // React frontend
  {
    files: ['src/**/*.{js,jsx}'],
    extends: [
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
  },

  // Node.js backend and configuration files
  {
    files: [
      'server/**/*.js',
      'vite.config.js',
      'cypress.config.js',
      'eslint.config.js',
    ],
    languageOptions: {
      globals: globals.node,
    },
  },

  // Cypress tests
  {
    files: ['cypress/**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      globals: {
        ...globals.mocha,
        cy: 'readonly',
        Cypress: 'readonly',
        expect: 'readonly',
        assert: 'readonly',
      },
    },
  },
])
import tsEslint from '@typescript-eslint/eslint-plugin'
import tsParser from '@typescript-eslint/parser'
import reactPlugin from 'eslint-plugin-react'
import reactNativePlugin from 'eslint-plugin-react-native'
import prettierPlugin from 'eslint-plugin-prettier'

export default [
  prettierConfig,
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: {jsx: true},
      },
    },
    plugins: {
      '@typescript-eslint': tsEslint,
      react: reactPlugin,
      'react-native': reactNativePlugin,
      prettier: prettierPlugin,
    },
    rules: {
      'react-native/no-inline-styles': 'warn',
      'react/jsx-uses-react': 'off',
      'react/react-in-jsx-scope': 'off',
      curly: ['error', 'multi'],
      semi: ['error', 'never'],
      quotes: [
        'error',
        'single',
        {avoidEscape: true, allowTemplateLiterals: true},
      ],
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {argsIgnorePattern: '^_', varsIgnorePattern: '^_'},
      ],
      eqeqeq: ['error', 'always'],
      'no-console': ['warn', {allow: ['warn', 'error']}],
      'no-var': 'error',
      'prefer-const': ['error', {destructuring: 'all'}],
      'array-bracket-spacing': ['error', 'never'],
      'comma-dangle': ['error', 'always-multiline'],
      'arrow-parens': ['error', 'as-needed'],
      'no-multiple-empty-lines': ['error', {max: 1}],
      'max-len': ['warn', {code: 120}],
      'prettier/prettier': 'error',
    },
  },
  {
    ignores: ['node_modules/**'],
  },
]

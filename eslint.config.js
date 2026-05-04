import { generateEslintConfig, PROJECT_TYPES } from '@hh.ru/eslint-config';

const hhConfig = generateEslintConfig(PROJECT_TYPES.SERVICE);

export default [
  ...hhConfig,
  {
    rules: {
      'no-restricted-syntax': 'warn',
    },
  },
];

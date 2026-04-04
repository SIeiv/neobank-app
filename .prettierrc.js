export default {
  singleQuote: true,
  trailingComma: 'es5',
  arrowParens: 'always',
  printWidth: 120,
  tabWidth: 2,
  overrides: [
    {
      files: ['*.css'],
      options: {
        tabWidth: 4,
      },
    },
    {
      files: ['*.json'],
      options: {
        semi: true,
      },
    },
  ],
};

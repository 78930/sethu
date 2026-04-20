module.exports = {
  root: true,
  env: {
    es2022: true,
    node: true,
    browser: true,
  },
  ignorePatterns: ['node_modules', 'dist', 'build'],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  overrides: [
    {
      files: ['**/*.ts', '**/*.tsx'],
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
      extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
    },
  ],
};

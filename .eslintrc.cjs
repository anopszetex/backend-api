module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ['google', 'prettier', 'eslint:recommended', 'plugin:n/recommended'],
  plugins: ['promise'],
  overrides: [
    {
      env: {
        node: true,
      },
      files: ['.eslintrc.{js,cjs}'],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-shadow': 'error',
    'no-unused-vars': ['error'],
    'no-undef': 'error',
    'no-console': 'error',
    'require-jsdoc': 'off',
  },
};

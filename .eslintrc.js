module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['@typescript-eslint', 'jest'],
  rules: {
    'react/react-in-jsx-scope': 'off',
    'react/jsx-props-no-spreading': 'error',
  },
  overrides: [
    {
      // Test files only
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
};

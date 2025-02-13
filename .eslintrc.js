module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['@typescript-eslint', 'jest'],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
  overrides: [
    {
      // Test files only
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
    },
  ],
};

module.exports = {
  root: true,
  extends: '@react-native',
  plugins: ['@typescript-eslint', 'jest'],
  rules: {
    'react/react-in-jsx-scope': 'off',
  },
};

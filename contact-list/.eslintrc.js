module.exports = {
  env: {
    node: true,
    es6: true,
    jest: true,
    browser: true,
  },
  parser: 'babel-eslint',
  extends: 'airbnb',
  plugins: ['react', 'jsx-a11y', 'import', 'react-native'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'no-use-before-define': ['error', { functions: false, classes: false, variables: false }],
  },
};

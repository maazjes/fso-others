module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true,
    'cypress/globals': true
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['react', 'cypress', 'prettier'],
  rules: {
    'comma-dangle': ['error', 'never'],
    semi: ['error', 'never'],
    indent: ['error', 2, { ignoredNodes: ['JSXElement *', 'JSXElement'] }],
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'global-require': 0,
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 2],
    'react/prop-types': 0,
    'max-len': ['error', 200],
    'operator-linebreak': ['error', 'none'],
    'no-plusplus': 'off',
    'consistent-return': 'off',
    'react/react-in-jsx-scope': 'off',
    'destructuring-newline/object-property-newline': 0,
    'object-curly-newline': ['error', { consistent: true }],
    'react/function-component-definition': 'off',
    'prettier/prettier': 2,
    'react/no-unescaped-entities': 0
  }
}

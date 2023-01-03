module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    jest: true
  },
  extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['react', 'prettier'],
  rules: {
    'comma-dangle': ['error', 'never'],
    semi: ['error', 'never'],
    indent: ['error', 2],
    'no-param-reassign': 0,
    'no-underscore-dangle': 0,
    'global-require': 0,
    'prettier/prettier': 2,
    'react/jsx-indent': ['error', 2],
    'react/jsx-indent-props': ['error', 4],
    'react/prop-types': 0,
    'max-len': ['error', 200],
    'operator-linebreak': ['error', 'none'],
    'no-plusplus': 'off',
    'consistent-return': 'off'
  }
}

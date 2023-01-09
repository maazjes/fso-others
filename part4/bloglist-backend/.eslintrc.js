module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        jest: true
    },
    extends: [
        'plugin:react/recommended',
        'airbnb'
    ],
    overrides: [
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    plugins: [
        'react'
    ],
    rules: {
        'comma-dangle': ['error', 'never'],
        semi: ['error', 'never'],
        indent: ['error', 4],
        'react/jsx-indent': ['error', 4],
        'react/jsx-indent-props': ['error', 4],
        'no-param-reassign': 0,
        'no-underscore-dangle': 0,
        'react/prop-types': 0,
        'max-len': ['error', 200],
        'destructuring-newline/object-property-newline': 0,
        'operator-linebreak': ['error', 'none'],
        'object-curly-newline': ['error', { consistent: true }],
        'no-plusplus': 'off',
        'consistent-return': 'off'
    }
}

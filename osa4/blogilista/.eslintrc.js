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
        'no-param-reassign': 0,
        'no-underscore-dangle': 0,
        'global-require': 0

    }
}

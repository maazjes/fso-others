module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        'jest/globals': true,
        'cypress/globals': true
    },
    extends: [
        'plugin:react/recommended',
        'airbnb',
        'plugin:react/jsx-runtime'
    ],
    overrides: [
    ],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: [
        'react',
        'destructuring-newline',
        'jest',
        'cypress'
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
    },
    settings: {
        react: {
            version: 'detect'
        }
    }
}

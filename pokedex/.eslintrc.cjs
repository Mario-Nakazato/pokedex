module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true
    },
    'extends': [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:vue/vue3-essential'
    ],
    'overrides': [
        {
            'env': {
                'node': true
            },
            'files': [
                '.eslintrc.{js,cjs}'
            ],
            'parserOptions': {
                'sourceType': 'script'
            }
        }
    ],
    'parserOptions': {
        'ecmaVersion': 'latest',
        'parser': '@typescript-eslint/parser',
        'sourceType': 'module'
    },
    'plugins': [
        '@typescript-eslint',
        'vue'
    ],
    'rules': {
        'vue/multi-word-component-names': 'off',
        semi: ['error', 'always'],
        quotes: ['error', 'single'],
        indent: ['error', 4],
        'comma-spacing': ['error', { before: false, after: true }],
    }
};

// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';
import eslintPluginPrettier from 'eslint-plugin-prettier';

export default withNuxt({
    languageOptions: {
        parserOptions: {
            ecmaVersion: 2022,
            sourceType: 'module'
        }
    },
    plugins: {
        prettier: eslintPluginPrettier
    },
    rules: {
        'no-unused-vars': 'warn',
        'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
        semi: ['error', 'always'],
        quotes: ['error', 'single'],

        'vue/multi-word-component-names': 'off',

        'prettier/prettier': [
            'error',
            {
                tabWidth: 4,
                useTabs: false,
                semi: true,
                singleQuote: true,
                printWidth: 100,
                bracketSpacing: true,
                arrowParens: 'avoid',
                trailingComma: 'none',
                htmlWhitespaceSensitivity: 'ignore',
                vueIndentScriptAndStyle: true,
                endOfLine: 'lf'
            }
        ]
    },
    ignores: ['dist', '.output', 'node_modules']
});

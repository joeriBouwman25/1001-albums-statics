import {globalIgnores} from 'eslint/config';
import globals from 'globals';
import jsoncParser from 'jsonc-eslint-parser';
import tseslint from 'typescript-eslint';

export default [
    // All files
    {
        rules: {
            'prettier/prettier': 'warn',
        },
    },

    // All JS/TS-like files
    {
        files: ['*/.ts', '*/.tsx', '*/.js', '*/.jsx'],
        rules: {
            'react/no-unknown-property': ['error', {ignore: ['css']}],
        },
        languageOptions: {
            parserOptions: {
                projectService: {
                    allowDefaultProject: ['eslint.config.js', 'vite.base.config.ts'],
                },
            },
            globals: {
                ...globals.browser,
                ...globals.node,
                ...globals.es2024,
            },
        },
    },

    // Typescript files
    {
        files: ['*/.ts', '*/.tsx'],
        languageOptions: {
            parser: tseslint.parser,
            parserOptions: {
                ecmaFeatures: {
                    modules: true,
                },
                ecmaVersion: 'latest',
                project: true,
            },
        },
    },
    // JSON files
    {
        files: ['*.json'],
        languageOptions: {
            parser: jsoncParser,
        },
    },

    globalIgnores(['dist']),
];
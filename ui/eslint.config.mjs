import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';
import pluginReact from 'eslint-plugin-react';
import pluginReactHooks from 'eslint-plugin-react-hooks';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
    {languageOptions: {globals: globals.browser}},
    pluginJs.configs.recommended,
    ...tseslint.configs.recommended,
    {
        rules: {
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/ban-types': 'off',
            '@typescript-eslint/no-var-requires': 'off'
        }
    },
    {
        settings: {
            react: {
                version: 'detect'
            }
        },
        plugins: {
            'react': pluginReact,
            'react-hooks': pluginReactHooks
        },
        rules: {
            ...pluginReact.configs.recommended.rules,
            'react/display-name': 'off',
            'react/no-string-refs': 'off',
            
            // Enforce fragment shorthand
            'react/jsx-fragments': ['error', 'syntax'],
            'react/jsx-no-useless-fragment': ['error', {allowExpressions: true}],
            
            // Discourage class components
            'react/prefer-stateless-function': 'error',
            'react/prefer-es6-class': ['error', 'always'],
            
            // React Hooks rules
            'react-hooks/rules-of-hooks': 'error',
            'react-hooks/exhaustive-deps': 'warn',
            
            // Warn about deprecated patterns
            'no-restricted-syntax': [
                'warn',
                {
                    'selector': 'MemberExpression[object.name="React"][property.name="Component"]',
                    'message': 'Prefer functional components with hooks over class components'
                },
                {
                    'selector': 'MemberExpression[object.name="React"][property.name="PureComponent"]',
                    'message': 'Prefer functional components with React.memo over PureComponent'
                },
                {
                    'selector': 'CallExpression[callee.property.name="Consumer"]',
                    'message': 'Prefer useContext hook over Context.Consumer'
                }
            ]
        }
    },
    eslintPluginPrettierRecommended,
    {
        files: ['./src/**/*.{ts,tsx}']
    },
    {
        ignores: ['dist', 'assets', '**/*.config.js', '__mocks__', 'coverage', '**/*.test.{ts,tsx}']
    }
];
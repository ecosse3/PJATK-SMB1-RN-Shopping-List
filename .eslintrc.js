module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:import/errors',
    'plugin:import/warnings',
    '@react-native-community',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2020,
    sourceType: 'module'
  },
  settings: {
    'import/extensions': ['.js', '.mjs', '.jsx', '.js', '.jsx', '.ts', '.tsx'],
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
      }
    }
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        tsx: 'never',
        ts: 'never',
        js: 'never',
        jsx: 'never'
      }
    ],
    'import/no-cycle': 0,
    'react-native/no-unused-styles': 2,
    'react-native/split-platform-components': 2,
    'react-native/no-color-literals': 2,
    'react-native/no-single-element-style-arrays': 2,
    'react-native/no-inline-styles': 0,
    'arrow-parens': 0,
    camelcase: 0,
    'comma-dangle': ['error', 'never'],
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/prefer-default-export': 0,
    quotes: [2, 'single', { avoidEscape: true }],
    'linebreak-style': 0,
    'max-len': [0, { code: 120 }],
    'no-multiple-empty-lines': 0,
    'no-underscore-dangle': 'off',
    'no-unused-expressions': 0,
    'no-unused-vars': 'warn',
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.tsx'] }
    ],
    'react/jsx-no-target-blank': 0,
    'react/jsx-one-expression-per-line': 0,
    'react/jsx-props-no-spreading': 0,
    'react/prop-types': 0,
    'react/require-default-props': 0,
    'react/forbid-prop-types': 0,
    'react/destructuring-assignment': 0,
    'react/display-name': 0,
    'react/no-children-prop': 0,
    'react-hooks/exhaustive-deps': 0,
    'object-curly-spacing': ['warn', 'always'],
    '@typescript-eslint/no-var-requires': 0,
    'global-require': 0
  }
};

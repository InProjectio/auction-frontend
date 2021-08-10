module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'class-methods-use-this': 'off',
    'no-use-before-define': 'off',
    semi: 0,
    'comma-dangle': 0,
    'react/prop-types': 0,
    'react-native/sort-styles': 0,
    'react-native/no-color-literals': 0,
    'object-curly-newline': 0,
    'react/display-name': 0,
    'prefer-destructuring': 0,
    'react-native/no-inline-styles': 0,
    'no-return-assign': 0,
    'no-throw-literal': 0,
    'no-restricted-globals': 0,
    camelcase: 0,
    'no-underscore-dangle': 0,
    'global-require': 0,
    'import/prefer-default-export': 0,
    'no-useless-return': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-props-no-spreading': 0,
    'react/no-array-index-key': 0,
    'import/named': 0,
    'react/static-property-placement': 0,
    'react/button-has-type': 0,
    'consistent-return': 0,
    'max-len': 0,
    'no-shadow': 0,
    'jsx-a11y/anchor-is-valid': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/label-has-associated-control': 0,
    'react/destructuring-assignment': 0,
    'no-bitwise': 0,
    'no-mixed-operators': 0,
    'react/no-did-update-set-state': 0,
    'no-useless-escape': 0,
    'no-await-in-loop': 0
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};

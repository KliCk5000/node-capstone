module.exports = {
  env: {
    node: true,
    jquery: true,
    mongo: true,
    mocha: true,
    es6: true,
    browser: true,
  },
  extends: ['airbnb-base', 'airbnb'],
  plugins: [],
  rules: {
    'consistent-return': 'off',
    'no-unused-vars': 'off',
    'no-undef': 'off',
    'no-use-before-define': 'off',
    'no-shadow': 'off',
    'prefer-promise-reject-errors': 'off',
    'func-names': 'off',
    'no-unused-expressions': 'off',
    // 'implicit-arrow-linebreak': ['error', 'beside'],
    // 'arrow-parens': 'always',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  },
};

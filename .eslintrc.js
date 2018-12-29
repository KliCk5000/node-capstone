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
    // 'implicit-arrow-linebreak': ['error', 'beside'],
    // 'arrow-parens': 'always',
    'no-underscore-dangle': ['error', { allow: ['_id'] }],
    'no-console': process.env.NODE_ENV === 'production' ? 2 : 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
  },
};

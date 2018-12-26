module.exports = {
  env: {
    node: true,
    jquery: true,
    mongo: true,
    mocha: true,
    es6: true
  },
  extends: ['airbnb', 'prettier'],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'consistent-return': 'off'
  }
}

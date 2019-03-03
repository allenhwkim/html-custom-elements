module.exports = {
  'env': {
    'browser': true,
    'es6': true,
  },
  'extends': 'google',
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 2018,
    'sourceType': 'module',
  },
  'rules': {
    'arrow-parens': 'off',
    'max-len': ['error', { 'code': 140 }],
    'no-unused-vars': 'off',
    'require-jsdoc': 'off',
    'valid-jsdoc': 'off',
    'no-invalid-this': 'off',
    'guard-for-in': 'off',
    'comma-dangle': 'off'
  },
};

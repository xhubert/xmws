module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    sourceType: 'module',
    parser: 'babel-eslint'
  },
  extends: [
    'eslint:recommended',
    'standard',
    'plugin:vue/strongly-recommended',
    'vuetify'
  ],
  // required to lint *.vue files
  plugins: ['standard', 'vue', 'html'],
  // add your custom rules here
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    semi: ['error', 'always'],
    'space-before-function-paren': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/html-self-closing': 'off',
    'vue/no-parsing-error': [2, { 'x-invalid-end-tag': false }],
    "vue/component-name-in-template-casing": ["error", "PascalCase", {
      "ignores": ['nuxt']
    }]
  }
};

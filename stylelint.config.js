module.exports = {
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-rscss/config',
  ],

  processors: [
    //
  ],

  // add your custom config here
  // https://stylelint.io/user-guide/configuration
  plugins: ['stylelint-scss'],

  customSyntax: 'postcss-html',

  syntax: 'scss',
  // customSyntax: 'scss',

  rules: {
    'selector-class-pattern': null,
    'no-empty-source': null,
    'at-rule-no-unknown': null,
    'scss/at-rule-no-unknown': true,
    'rscss/class-format': [
      true,
      {
        maxDepth: '8',
      },
    ],
  },
};

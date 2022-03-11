const allowedComponentNamesRegExp = `(^agile__slides|agile__dot--current|agile__slide|agile__track)`;
const allowedElementNamesRegExp = `(^agile__list|agile__slide|agile__dots|agile__dot|agile__actions|ci-off_close)`;
const allowedVariantNamesRegExp = `(^p-focus|p-inputswitch)`;

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
    'no-descending-specificity': null,
    'rscss/class-format': [
      true,
      {
        maxDepth: '8',
        component: `${allowedComponentNamesRegExp}|^([a-z][a-z0-9]*)(-[a-z0-9]+)*$`,
        element: `${allowedElementNamesRegExp}|(^([a-z][a-z0-9]*)(-[a-z0-9]+)*$)`,
        variant: `${allowedVariantNamesRegExp}|(^(-[a-z0-9]+)(-[a-z0-9]+)*$)`,
      },
    ],
    'rscss/no-descendant-combinator': true,
    'declaration-block-no-duplicate-properties': null,
    'declaration-block-no-redundant-longhand-properties': null,
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['deep'],
      },
    ],
    'keyframes-name-pattern': [
      '[a-zA-Z]+',
      {
        message: 'Expected keyframe name to be camel-case',
      },
    ],
  },
};

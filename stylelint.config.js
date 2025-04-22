module.exports = {
  root: true, // 表示该文件是根配置文件，阻止 Stylelint 继续向上查找其他父级配置。
  plugins: ['stylelint-order'], // 用于强制规定属性、规则和 at-rules 在 CSS 中的顺序。
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'], // 继承两个预定义的配置
  customSyntax: 'postcss-html', // 指定 style 标签或内联样式的解析器（确保 Stylelint 能正确解析和检查这些文件）
  rules: {
    // ------通用规则------
    'function-no-unknown': null, // 允许位置函数
    'selector-class-pattern': null, // 禁用对类型模式的限制
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'deep'],
      },
    ], // 禁用未知伪类，global 和 deep 除外
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'],
      },
    ], // 禁用未知伪元素，v-deep 除外
    'at-rule-no-unknown': [
      true,
      {
        ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen', 'function', 'if', 'each', 'include', 'mixin'],
      },
    ], // 禁止未知 at-rule（css 规则），以上除外
    'no-empty-source': null, // 允许空源文件
    'string-quotes': null, // 禁用字符串引号的限制
    'named-grid-areas-no-invalid': null, // 禁用对无效命名网格区域的检查
    'unicode-bom': 'never', // 确保文件中没有 Unicode BOM
    'no-descending-specificity': null, // 禁用对降序特异性的检查
    'font-family-no-missing-generic-family-keyword': null, // 用对缺少通用字体族关键字的检查
    // ------格式规则------
    'declaration-colon-space-after': 'always-single-line', // 要求声明中的冒号后有一个空格
    'declaration-colon-space-before': 'never', // 禁用声明中的冒号前的空格
    // 'declaration-block-trailing-semicolon': 'always', // 要求声明块以分号结尾
    'rule-empty-line-before': [
      'always',
      {
        ignore: ['after-comment', 'first-nested'],
      },
    ], // 要求规则前有一行空行，除非它紧跟注释或作为第一个嵌套规则
    // ------单位规则------
    'unit-no-unknown': [true, { ignoreUnits: ['rpx'] }], // 禁止未知单位，但忽略 rpx。
    'order/order': [
      [
        'dollar-variables',
        'custom-properties',
        'at-rules',
        'declarations',
        {
          type: 'at-rule',
          name: 'supports',
        }, // @supports
        {
          type: 'at-rule',
          name: 'media',
        }, // @media
        'rules',
      ],
      { severity: 'warning' },
    ], // 强制规定 CSS 规则的顺序，并设置警告级别
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
  // ------覆盖规则------
  overrides: [
    {
      files: ['*.vue', '**/*.vue', '*.html', '**/*.html'], // 对 .vue 和 .html 文件应用特定规则
      extends: ['stylelint-config-recommended'], // 继承预设规则
      rules: {
        'keyframes-name-pattern': null, // 禁用关键帧名称模式检查
        'selector-pseudo-class-no-unknown': [
          true,
          {
            ignorePseudoClasses: ['deep', 'global'], // 忽略 deep 和 global 伪类
          },
        ],
        'selector-pseudo-element-no-unknown': [
          true,
          {
            ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted'], // v-deep、v-global 和 v-slotted 伪元素
          },
        ],
      },
    },
    {
      files: ['*.less', '**/*.less'], // 针对 less 文件
      customSyntax: 'postcss-less', // 使用 postcss-less 作为自定义语法解析器
      extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue'], // 继承预设规则
    },
  ],
};

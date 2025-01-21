module.exports = {
  root: true,
  plugins: ['stylelint-order'],
  extends: ['stylelint-config-standard', 'stylelint-config-prettier'],
  customSyntax: 'postcss-html',
  rules: {
    'function-no-unknown': null, // 允许使用未知的函数
    'selector-class-pattern': null, // 不限制 CSS 类名的命名模式
    'selector-pseudo-class-no-unknown': [
      true,
      {
        ignorePseudoClasses: ['global', 'deep'] // 允许使用 :global 和 :deep 伪类
      }
    ],
    'selector-pseudo-element-no-unknown': [
      true,
      {
        ignorePseudoElements: ['v-deep'] // 允许使用 v-deep 伪元素
      }
    ],
    // 'at-rule-no-unknown': [
    //   true,
    //   {
    //     ignoreAtRules: ['tailwind', 'apply', 'variants', 'responsive', 'screen', 'function', 'if', 'each', 'include', 'mixin']
    //   }
    // ],
    'no-empty-source': null, // 允许空的样式源文件
    'string-quotes': null, // 不限制引号类型（单引号或双引号）
    'named-grid-areas-no-invalid': null, // 允许无效的网格区域名称
    'unicode-bom': 'never', // 禁止使用 Unicode BOM

    'declaration-colon-space-after': 'always-single-line', // 冒号后必须有空格（单行声明）
    'declaration-colon-space-before': 'never', // 冒号前不允许有空格
    // 'declaration-block-trailing-semicolon': 'always',
    'rule-empty-line-before': [
      'always',
      {
        ignore: [
          'after-comment', // 注释后不需要空行
          'first-nested' // 第一个嵌套规则不需要空行
        ]
      }
    ],
    // 样式属性的排序规则
    'order/order': [
      [
        'dollar-variables', // $ 变量（Sass）
        'custom-properties', // CSS 自定义属性
        'at-rules', // @ 规则
        'declarations', // 普通声明
        {
          type: 'at-rule',
          name: 'supports' // @supports 规则
        },
        {
          type: 'at-rule',
          name: 'media' // @media 规则
        },
        'rules' // 其他规则
      ],
      {
        severity: 'warning' // 违反排序只警告，不报错
      }
    ]
  },
  ignoreFiles: ['**/*.js', '**/*.jsx', '**/*.tsx', '**/*.ts'],
  // 特殊文件配置
  overrides: [
    // vue
    {
      files: ['*.vue', '**/*.vue', '*.html', '**/*.html'],
      extends: ['stylelint-config-recommended'], // 继承 stylelint 推荐的基础配置
      rules: {
        'keyframes-name-pattern': null, // 关闭对 keyframes 动画名称的命名规范检查
        // 伪类选择器规则
        'selector-pseudo-class-no-unknown': [
          true, // 启用
          {
            ignorePseudoClasses: ['deep', 'global'] // 忽略 Vue 特有的伪类
          }
        ],
        // 配置伪元素选择器的规则
        'selector-pseudo-element-no-unknown': [
          true,
          {
            ignorePseudoElements: ['v-deep', 'v-global', 'v-slotted'] // 忽略 Vue 特有的伪元素
          }
        ]
      }
    },
    // less
    {
      files: ['*.less', '**/*.less'],
      customSyntax: 'postcss-less', // 指定使用 postcss-less 解析器来处理 Less 语法
      extends: ['stylelint-config-standard', 'stylelint-config-recommended-vue'] // 继承两个预设的规则集
    }
  ]
};

module.exports = {
  root: true,
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  parser: 'vue-eslint-parser', // Vue 文件的主解析器
  parserOptions: {
    parser: '@typescript-eslint/parser', // TypeScript 的解析器
    ecmaVersion: 2020, // 支持的 ECMAScript 版本
    sourceType: 'module' // 使用 ES 模块
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:prettier/recommended', 'plugin:vue/vue3-essential'],
  // overrides: [
  //   {
  //     env: {
  //       node: true
  //     },
  //     files: ['.eslintrc.{js,cjs}'],
  //     parserOptions: {
  //       sourceType: 'script'
  //     }
  //   }
  // ],
  // plugins: ['@typescript-eslint', 'vue'],
  rules: {
    'vue/script-setup-uses-vars': 'error', // 强制在 <script setup> 中声明的变量必须使用
    '@typescript-eslint/ban-ts-ignore': 'off', // 允许使用 @ts-ignore 注释
    '@typescript-eslint/explicit-function-return-type': 'off', // 不强制要求函数必须有返回值类型注解
    '@typescript-eslint/no-explicit-any': 'off', // 允许使用 any 类型
    '@typescript-eslint/no-var-requires': 'off', // 允许使用 require 语句
    '@typescript-eslint/no-empty-function': 'off', // 允许空函数
    'vue/custom-event-name-casing': 'off', // 关闭自定义事件名称大小写规则
    // 允许在变量定义前使用
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/ban-ts-comment': 'off', // 允许使用 @ts-comment 注释
    '@typescript-eslint/ban-types': 'off', // 允许使用内置类型（如 Object、Function）
    '@typescript-eslint/no-non-null-assertion': 'off', // 允许使用非空断言操作符 !
    '@typescript-eslint/explicit-module-boundary-types': 'off', // 不要求导出函数和类的公共类方法明确声明返回值和参数类型
    // TypeScript 未使用变量规则
    '@typescript-eslint/no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    // JavaScript 未使用变量规则（同上）
    'no-unused-vars': [
      'error',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_'
      }
    ],
    'space-before-function-paren': 'off', // 关闭函数括号前的空格规则

    'vue/attributes-order': 'off', // 关闭属性排序要求
    'vue/one-component-per-file': 'off', // 允许一个文件中包含多个组件
    'vue/html-closing-bracket-newline': 'off', // 关闭 HTML 闭合标签换行规则
    'vue/max-attributes-per-line': 'off', // 关闭每行最大属性数量限制
    'vue/multiline-html-element-content-newline': 'off', // 关闭多行元素内容换行规则
    'vue/singleline-html-element-content-newline': 'off', // 关闭单行元素内容换行规则
    'vue/attribute-hyphenation': 'off', // 关闭属性名称连字符规则
    'vue/require-default-prop': 'off', // 不要求 props 必须有默认值
    'vue/require-explicit-emits': 'off', // 不要求显式声明 emits
    // HTML 标签自闭合规则
    'vue/html-self-closing': [
      'error',
      {
        html: {
          void: 'always', // 空元素总是自闭合
          normal: 'never', // 普通元素不自闭合
          component: 'always' // 组件总是自闭合
        },
        svg: 'always', // SVG 元素总是自闭合
        math: 'always' // MathML 元素总是自闭合
      }
    ],
    'vue/multi-word-component-names': 'off' // 允许单个单词的组件名
  }
};

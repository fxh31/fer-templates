module.exports = {
  printWidth: 160, // 设置代码行的最大宽度为 160 个字符（超过自动换行）
  semi: true, // 语句末尾添加分号
  vueIndentScriptAndStyle: true, // 在 Vue 文件中缩进 <script> 和 <style> 标签内的代码
  singleQuote: true, // 使用单引号而不是双引号
  trailingComma: 'none', // 不在对象或数组的最后一个元素后添加逗号
  proseWrap: 'never', // 不对 markdown 等散文文本进行自动换行
  htmlWhitespaceSensitivity: 'strict', // HTML 空白符敏感度设置为严格模式
  endOfLine: 'auto', // 自动检测并维护文件的换行符格式（Windows 用 CRLF，Unix 用 LF）
  bracketSameLine: true, // 将 HTML 标签的闭合括号放在最后一行的末尾
  jsxBracketSameLine: true, // 将 JSX 标签的闭合括号放在最后一行的末尾
  arrowParens: 'avoid', // 当箭头函数只有一个参数时，避免使用括号
};

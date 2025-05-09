import { generate } from '@ant-design/colors';

export const primaryColor = '#1890ff';

export const darkMode = 'light';

type Fn = (...arg: any) => any;

type GenerateTheme = 'default' | 'dark';

export interface GenerateColorsParams {
  mixLighten: Fn;
  mixDarken: Fn;
  tinycolor: any;
  color?: string;
}

/**
 * 基于 @ant-design/colors 生成一组渐变色（通常是一个包含 10 个不同明度的颜色数组）
 * Generate colors according to theme color
 */
export function generateAntColors(color: string, theme: GenerateTheme = 'default') {
  return generate(color, {
    theme,
  });
}

/**
 * 获取主题色
 * Get theme colors
 */
export function getThemeColors(color?: string) {
  const tc = color || primaryColor;
  const lightColors = generateAntColors(tc); // 浅色主题
  const primary = lightColors[5]; // 主色
  const modeColors = generateAntColors(primary, 'dark'); // 暗色主题

  return [...lightColors, ...modeColors];
}

/**
 * 生成多种类型的衍生色
 * Generate multiple types of derivative colors
 */
export function generateColors({ color = primaryColor, mixLighten, mixDarken, tinycolor }: GenerateColorsParams) {
  const arr = new Array(19).fill(0);
  const lightens = arr.map((_t, i) => {
    return mixLighten(color, i / 5);
  }); // 过渡色（浅）

  const darkens = arr.map((_t, i) => {
    return mixDarken(color, i / 5);
  }); // 过渡色（暗）

  const alphaColors = arr.map((_t, i) => {
    return tinycolor(color)
      .setAlpha(i / 20)
      .toRgbString();
  }); // 透明度

  const shortAlphaColors = alphaColors.map(item => item.replace(/\s/g, '').replace(/0\./g, '.')); // 简化透明度

  const tinycolorLightens = arr
    .map((_t, i) => {
      return tinycolor(color)
        .lighten(i * 5)
        .toHexString();
    })
    .filter(item => item !== '#ffffff'); // 精准控制亮度（浅）

  const tinycolorDarkens = arr
    .map((_t, i) => {
      return tinycolor(color)
        .darken(i * 5)
        .toHexString();
    })
    .filter(item => item !== '#000000'); // 精准控制亮度（暗）

  return [...lightens, ...darkens, ...alphaColors, ...shortAlphaColors, ...tinycolorDarkens, ...tinycolorLightens].filter(item => !item.includes('-'));
}

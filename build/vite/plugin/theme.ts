/**
 * Vite 动态配置主题颜色
 * Vite plugin for website theme color switching
 * https://github.com/anncwb/vite-plugin-theme
 */
import type { PluginOption } from 'vite';

import path from 'path';
import { viteThemePlugin, antdDarkThemePlugin, mixLighten, mixDarken, tinycolor } from '@rys-fe/vite-plugin-theme';
import { getThemeColors, generateColors } from '../../config/themeConfig';
import { generateModifyVars } from '../../generate/generateModifyVars';

export function configThemePlugin(isBuild: boolean): PluginOption[] {
  const colors = generateColors({
    mixDarken,
    mixLighten,
    tinycolor,
  });

  const plugin = [
    antdDarkThemePlugin({
      preloadFiles: [path.resolve(process.cwd(), 'src/design/index.less')], // 预加载指定样式（确保在主题变量生效前加载必要的样式，避免样式覆盖问题）
      filter: id => (isBuild ? !id.endsWith('antd.less') : true),
      darkModifyVars: {
        ...generateModifyVars(),
        // todo：暗色模式处理样式
        'text-color-label': '#606266',
        'border-color-base': '#303030',
        'border-color-base1': '#303030',
      },
    }),
  ];

  return plugin as unknown as PluginOption[];
}

import type { PluginOption } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import purgeIcons from 'vite-plugin-purge-icons';
import windiCSS from 'vite-plugin-windicss';

import { configThemePlugin } from './theme';
import { configSvgIconsPlugin } from './svgSprite';

// 配置插件（区分生产环境和开发环境）
export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [vue(), vueJsx()];

  // vite-plugin-windicss
  vitePlugins.push(windiCSS());

  // vite-plugin-svg-icons
  vitePlugins.push(configSvgIconsPlugin(isBuild));

  // vite-plugin-purge-icons
  vitePlugins.push(purgeIcons());

  // vite-plugin-theme
  vitePlugins.push(configThemePlugin(isBuild));

  return vitePlugins;
}

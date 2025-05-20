import type { PluginOption } from 'vite';

import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

import { configThemePlugin } from './theme';

// 配置插件（区分生产环境和开发环境）
export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [vue(), vueJsx()];

  // vite-plugin-theme
  vitePlugins.push(configThemePlugin(isBuild));

  return vitePlugins;
}

import type { PluginOption } from 'vite';

import vue from '@vitejs/plugin-vue';

import { configThemePlugin } from './theme';

// 配置插件（区分生产环境和开发环境）
export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const vitePlugins: (PluginOption | PluginOption[])[] = [vue()];

  // vite-plugin-theme
  vitePlugins.push(configThemePlugin(isBuild));

  return vitePlugins;
}

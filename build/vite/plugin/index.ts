import type { PluginOption } from 'vite';

import vue from '@vitejs/plugin-vue';

import { configCdnPlugin } from './cdn';
import { configCompressPlugin } from './compress';
export function createVitePlugins(viteEnv: ViteEnv, isBuild: boolean) {
  const { VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE, VITE_CDN } = viteEnv;

  const vitePlugins: (PluginOption | PluginOption[])[] = [vue()];

  if (isBuild) {
    // vite-plugin-cdn-import
    if (VITE_CDN) vitePlugins.push(configCdnPlugin);

    // rollup-plugin-gzip
    vitePlugins.push(configCompressPlugin(VITE_BUILD_COMPRESS, VITE_BUILD_COMPRESS_DELETE_ORIGIN_FILE));
  }

  return vitePlugins;
}

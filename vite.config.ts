import type { UserConfig, ConfigEnv } from 'vite';
import { fileURLToPath, URL } from 'node:url';

import { loadEnv } from 'vite';
import { resolve } from 'path';
import { wrapperEnv } from './build/utils';
import { createProxy } from './build/vite/proxy';
import { createVitePlugins } from './build/vite/plugin';
function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);

  const viteEnv = wrapperEnv(env);
  const { VITE_PORT, VITE_DROP_CONSOLE } = viteEnv;
  const isBuild = command === 'build';

  return {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      // host: true,
      // https: true,
      proxy: createProxy(VITE_PROXY),
      open: false,
    },
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
          drop_debugger: true,
        },
      },
      reportCompressedSize: false, // 关闭压缩大小报告功能，稍微减少打包时间
      chunkSizeWarningLimit: 2000, // chunk 文件大小警告的限制
      rollupOptions: {
        input: {
          index: pathResolve('index.html'),
        },
        // 静态资源分类打包
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        },
      },
    },
    plugins: createVitePlugins(viteEnv, isBuild),
    css: {
      // preprocessorOptions: {
      //   less: {
      //     javascriptEnabled: true,
      //   },
      // },
    },
  };
};

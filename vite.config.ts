import type { UserConfig, ConfigEnv } from 'vite';

import { loadEnv } from 'vite';
import { resolve } from 'path';

import pkg from './package.json';
import { createProxy } from './build/vite/proxy';
import { wrapperEnv } from './build/utils';
import { createVitePlugins } from './build/vite/plugin';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version }
};

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const root = process.cwd();

  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);

  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_PROXY, VITE_DROP_CONSOLE } = viteEnv;

  const isBuild = command === 'build';

  return {
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: [
        // @/xxxx => src/xxxx
        {
          find: /@\//,
          replacement: pathResolve('src') + '/'
        },
        // #/xxxx => types/xxxx
        {
          find: /#\//,
          replacement: pathResolve('types') + '/'
        }
      ]
    },
    server: {
      https: false,
      // Listening on all local IPs
      host: true,
      port: VITE_PORT,
      // Load proxy configuration from .env
      proxy: createProxy(VITE_PROXY),
      open: true //vite项目启动时自动打开浏览器
    },
    // vite 内置 esbuild 库
    esbuild: {
      drop: VITE_DROP_CONSOLE ? ['console', 'debugger'] : [] // 开发模式下使用热更新构建是否删除 console
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome80',
      outDir: OUTPUT_DIR,
      minify: 'terser',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE, // 生产模式下在打包文件中删除所有的 console
          drop_debugger: true
        }
      },
      reportCompressedSize: false, // 关闭压缩大小报告（can slightly reduce packaging time）
      chunkSizeWarningLimit: 2000, // 设置代码块大小警告的阈值为 2000 KB
      rollupOptions: {
        input: {
          index: pathResolve('index.html')
        },
        // 静态资源分类打包
        output: {
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
        }
      }
    },
    // 全局定义变量
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__)
    },
    plugins: createVitePlugins(viteEnv, isBuild)
  };
};

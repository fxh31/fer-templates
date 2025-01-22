import type { UserConfig, ConfigEnv } from 'vite';

import { resolve } from 'path';
import vue from '@vitejs/plugin-vue';

function pathResolve(dir: string) {
  return resolve(process.cwd(), '.', dir);
}

export default ({}: ConfigEnv): UserConfig => {
  return {
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
    plugins: [vue()]
  };
};

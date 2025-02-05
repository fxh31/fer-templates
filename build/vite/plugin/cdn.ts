/**
 * @deprecated 打包时采用 cdn 模式
 */
import { Plugin as importToCDN } from 'vite-plugin-cdn-import';

export const configCdnPlugin = importToCDN({
  //（name: 对应下面modules的name，version: 自动读取本地package.json中dependencies依赖中对应包的版本号，path: 对应下面modules的path，当然也可写完整路径，会替换prodUrl）
  prodUrl: 'https://cdn.bootcdn.net/ajax/libs/{name}/{version}/{path}',
  modules: [
    {
      name: 'vue',
      var: 'Vue',
      path: 'vue.global.prod.min.js'
    },
    {
      name: 'vue-router',
      var: 'VueRouter',
      path: 'vue-router.global.min.js'
    },
    // 项目中没有直接安装vue-demi，但是pinia用到了，所以需要在引入pinia前引入vue-demi（https://github.com/vuejs/pinia/blob/v2/packages/pinia/package.json#L77）
    {
      name: 'vue-demi',
      var: 'VueDemi',
      path: 'https://cdn.bootcdn.net/ajax/libs/vue-demi/0.14.5/index.iife.min.js'
    },
    {
      name: 'pinia',
      var: 'Pinia',
      path: 'pinia.iife.min.js'
    },
    {
      name: 'axios',
      var: 'axios',
      path: 'axios.min.js'
    },
    {
      name: 'dayjs',
      var: 'dayjs',
      path: 'dayjs.min.js'
    },
    {
      name: 'echarts',
      var: 'echarts',
      path: 'echarts.min.js'
    }
  ]
});

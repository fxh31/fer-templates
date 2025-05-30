import type { RouteRecordRaw } from 'vue-router';
import type { App } from 'vue';

import { createRouter, createWebHistory } from 'vue-router';
import { basicRoutes } from './routes';
import { getferfAppId } from '@/utils/fer';

// 路由白名单（白名单应该包含基本静态路由）
const WHITE_NAME_LIST: string[] = [];
const getRouteNames = (array: any[]) =>
  array.forEach(item => {
    WHITE_NAME_LIST.push(item.name);
    getRouteNames(item.children || []);
  });
getRouteNames(basicRoutes);

// 取路径上的应用识别码的作为基础路由
let VITE_PUBLIC_PATH = import.meta.env.VITE_PUBLIC_PATH;
const appId = getferfAppId();
if (appId) VITE_PUBLIC_PATH = '/' + appId;

export const router = createRouter({
  // 创建一个 hash 历史记录。
  history: createWebHistory(VITE_PUBLIC_PATH),
  // 添加到路由的初始路由列表。
  routes: basicRoutes as unknown as RouteRecordRaw[],
  // 是否应该禁止尾部斜杠。默认为假
  strict: true,
  scrollBehavior: () => ({ left: 0, top: 0 }),
});

// config router
// 配置路由器
export function setupRouter(app: App<Element>) {
  app.use(router);
}

// reset router
// 重置路由
export function resetRouter() {
  router.getRoutes().forEach(route => {
    const { name } = route;
    if (name && !WHITE_NAME_LIST.includes(name as string)) {
      router.hasRoute(name) && router.removeRoute(name);
    }
  });
}

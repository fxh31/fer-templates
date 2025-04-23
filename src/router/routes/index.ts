import type { AppRouteRecordRaw } from '@/router/types';

import { COMMON_ROUTE } from '@/router/routes/basic';

import { PageEnum } from '@/enums/pageEnum';

// 根路由
export const RootRoute: AppRouteRecordRaw = {
  path: '/',
  name: 'Root',
  redirect: PageEnum.BASE_HOME,
  meta: {
    title: 'Root',
  },
};

export const LoginRoute: AppRouteRecordRaw = {
  path: '/login',
  name: 'Login',
  component: () => import('@/views/basic/home/index.vue'),
  meta: {},
};

// 路由白名单
export const basicRoutes = [RootRoute, LoginRoute, COMMON_ROUTE];

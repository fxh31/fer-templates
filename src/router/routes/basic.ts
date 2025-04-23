import type { AppRouteRecordRaw } from '@/router/types';
import { LAYOUT } from '@/router/constant';

export const COMMON_ROUTE: AppRouteRecordRaw = {
  path: '/common-route',
  name: 'commonRoute',
  component: LAYOUT,
  redirect: '/home',
  meta: {
    title: 'commonRoute',
  },
  children: [
    {
      path: '/home',
      component: () => import('@/views/basic/home/index.vue'),
      name: 'home',
      meta: {
        defaultTitle: '首页',
      },
    },
  ],
};

import type { AppRouteRecordRaw } from '@/router/types';
import { LAYOUT, PAGE_NOT_FOUND_NAME, EXCEPTION_COMPONENT } from '@/router/constant';

// 404 on a page
export const PAGE_NOT_FOUND_ROUTE: AppRouteRecordRaw = {
  path: '/:path(.*)*',
  name: PAGE_NOT_FOUND_NAME,
  component: LAYOUT,
  meta: {
    title: 'ErrorPage',
  },
  children: [
    {
      path: '/:path(.*)*',
      name: '404',
      component: EXCEPTION_COMPONENT,
      meta: {
        title: '404',
      },
    },
  ],
};

export const ERROR_LOG_ROUTE: AppRouteRecordRaw = {
  path: '/error-log',
  name: 'ErrorLog',
  component: LAYOUT,
  redirect: '/error-log/list',
  meta: {
    title: 'ErrorLog',
    hideBreadcrumb: true,
    hideChildrenInMenu: true,
  },
  children: [
    {
      path: 'list',
      name: 'ErrorLogList',
      component: () => import('@/views/basic/error-log/index.vue'),
      meta: {
        title: '错误日志列表',
        hideBreadcrumb: true,
        currentActiveMenu: '/error-log',
      },
    },
  ],
};

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

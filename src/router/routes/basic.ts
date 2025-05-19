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

export const IFRAME_TEST: AppRouteRecordRaw = {
  path: '/iframe',
  name: 'iframeApp',
  component: () => import('@/views/basic/home/index.vue'),
  meta: {
    title: 'iframeApp',
  },
  children: [
    {
      path: 'iframe2/:id?',
      // component: () => import('@/views/iframTest/iframeContent.vue'),
      name: 'iframe2',
      meta: {
        defaultTitle: 'iframe1',
        url: 'https://play.vuejs.org/#eNp9kU1PAyEQhv8K4VJNm65GT8228SM96EGNeuRS6eyWlgUCQ91ks//dgU1rD01vzDwPwwt0/NG56T4Cn/EySK8csgAY3UIY1TjrkXXMQ8V6VnnbsBGpI2GEkdYEZE2o2Tzxq5trYcpimEB7qUBonF4hUMVYublddF32+74sqCLjJyJawx6kVnI3F5zoeCz4YlwWA0pScTKHTzgGOrlS9XQbrKHQXZouuLSNUxr8u0NFyQSfsUwSW2ltf19zD32EyaEvNyB3Z/rb0Kae4B8eAvg9CH5kuPI14ICXX2/Q0voIG7uOmuwL8BOC1TFlHLSnaNYU+8TLaV/y0ytTf4dli2DC4VIpaDL77AtO3/F84er/ce+m93mfMD3v/wB/yaYP',
        iframe: true,
      },
    },
    {
      path: 'iframe3/:id?',
      name: 'iframe3',
      meta: {
        defaultTitle: 'iframe3',
        url: 'https://router.vuejs.org/zh/guide/advanced/router-view-slot.html',
        keepAlive: true,
        iframe: true, // 是否使用 iframe
      },
    },
    {
      path: 'route1',
      component: () => import('@/views/iframTest/index.vue'),
      name: 'route1',
      meta: {
        defaultTitle: 'route1',
        iframe: false,
        keepAlive: true,
      },
    },
    {
      path: 'iframeBasic',
      component: () => import('@/views/basic/iframe/index.vue'),
      name: 'iframeBasic',
      meta: {
        defaultTitle: 'iframeBasic',
        iframe: false,
        // keepAlive: true,
      },
    },
  ],
};

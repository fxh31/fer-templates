import type { Router, RouteLocationNormalized } from 'vue-router';
import { createStateGuard } from './stateGuard';
export function setupRouterGuard(router: Router) {
  createPageGuard(router);
  createPageLoadingGuard(router);
  createHttpGuard(router);
  createScrollGuard(router);
  createMessageGuard(router);
  createProgressGuard(router);

  createStateGuard(router);
}

/**
 * 页面状态守卫
 */
function createPageGuard(router: Router) {
  router.beforeEach(async to => {
    return true;
  });
  router.beforeEach(async to => {
    return true;
  });

  router.afterEach(to => {});
  router.afterEach(to => {});
}

/**
 * 页面加载状态守卫
 */
function createPageLoadingGuard(router: Router) {
  router.beforeEach(async to => {
    return true;
  });
  router.afterEach(async () => {
    return true;
  });
}

/**
 * 切换路由时取消当前页面调用请求接口守卫
 */
function createHttpGuard(router: Router) {
  // todo：取消当前页面发送的请求
  router.beforeEach(async () => {
    return true;
  });
}

/**
 * 页面滚动到顶部
 */
function createScrollGuard(router: Router) {}

/**
 * 关闭消息弹窗时的守卫
 */
function createMessageGuard(router: Router) {
  // todo：关闭消息弹窗时，摧毁弹窗实例
}

/**
 * 页面进度条守卫
 */
export function createProgressGuard(router: Router) {}

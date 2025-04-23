import type { Router } from 'vue-router';
export function createStateGuard(router: Router) {
  router.afterEach(to => {
    // todo：清理页面登录信息和验证信息，以及缓存等
  });
}

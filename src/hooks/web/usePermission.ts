import type { RouteRecordRaw } from 'vue-router';

import { useRoute } from 'vue-router';
import { router, resetRouter } from '@/router';
import { usePermissionStore } from '@/stores/modules/permission';
import { useUserStore } from '@/stores/modules/user';

/**
 * 用户权限相关操作
 * User permission related operations
 */
export function usePermission() {
  const userStore = useUserStore();
  const permissionStore = usePermissionStore();

  const permissionList = [];
  const route = useRoute();

  /**
   * Reset and regain authority resource information
   * 重置和重新获得权限资源信息
   */
  async function resume() {
    resetRouter();
    const routes = await permissionStore.buildRoutesAction();
    routes.forEach(route => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });
    permissionStore.setLastBuildMenuTime();
  }

  // 确定是否有列表权限
  function hasColumnPermission(value?: string, def = true): boolean {
    if (!value) return def;
    const modelId = route.meta.modelId || '';
    if (!modelId) return false;
    const list = permissionList.filter(o => o.modelId === modelId);
    if (!list.length) return false;
    const columnList = list[0] && list[0].column ? list[0].column : [];
    if (!columnList.length) return false;
    const hasPermission = columnList.some(column => column.enCode === value);
    if (hasPermission) return true;
    return false;
  }

  // 确定是否有表单权限
  function hasFormPermission(value?: string, def = true): boolean {
    if (!value) return def;
    const modelId = route.meta.modelId || '';
    if (!modelId) return false;
    const list = permissionList.filter(o => o.modelId === modelId);
    if (!list.length) return false;
    const formList = list[0] && list[0].form ? list[0].form : [];
    if (!formList.length) return false;
    const hasPermission = formList.some(form => form.enCode === value);
    if (hasPermission) return true;
    return false;
  }

  // 确定是否有按钮权限
  function hasBtnPermission(value?: string, def = true): boolean {
    if (!value) return def;
    const modelId = route.meta.modelId || '';
    if (!modelId) return false;
    const list = permissionList.filter(o => o.modelId === modelId);
    if (!list.length) return false;
    const btnList = list[0] && list[0].button ? list[0].button : [];
    if (!btnList.length) return false;
    const hasPermission = btnList.some(btn => btn.enCode === value);
    if (hasPermission) return true;
    return false;
  }

  /**
   * 刷新菜单数据
   * refresh menu data
   */
  async function refreshMenu() {
    resume();
  }

  return { hasColumnP: hasColumnPermission, hasFormP: hasFormPermission, hasBtnP: hasBtnPermission, refreshMenu };
}

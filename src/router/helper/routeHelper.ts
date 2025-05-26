import type { Router, RouteRecordNormalized } from 'vue-router';
import type { AppRouteModule, AppRouteRecordRaw } from '@/router/types';

import { defineComponent, defineAsyncComponent, h } from 'vue';
import { createRouter, createWebHashHistory } from 'vue-router';
import { cloneDeep, omit } from 'lodash-es';

import { PageEnum } from '@/enums/pageEnum';
import { BackMenu } from '@/api/basic/model/userModel';
import { useGlobSetting } from '@/hooks/setting';
import { getToken } from '@/utils/auth';
import { getParentLayout, LAYOUT, EXCEPTION_COMPONENT } from '@/router/constant';

let dynamicViewsModules: Record<string, () => Promise<Recordable>>;

/**
 * 将指定组件设置自定义名称
 * Set custom names for components
 */
function createCustomComponent(customName, asyncComponent) {
  return defineComponent({
    name: customName,
    setup() {
      return () => h(asyncComponent);
    },
  });
}

/**
 * 动态引入组件
 * Dynamic import component
 */
// 异步 - async
function asyncImportRoute(routes: AppRouteRecordRaw[] | undefined) {
  dynamicViewsModules = dynamicViewsModules || import.meta.glob('../../views/**/*.{vue,tsx}');
  if (!routes) return;

  routes.forEach(item => {
    if (!item.component && item.meta?.frameSrc) {
      item.component = 'IFRAME';
    }
    const { component, name, children } = item;

    // todo: route mapping
    if (component) {
    } else if (name) {
    }

    children && asyncImportRoute(children);
  });
}
// 同步 sync
function dynamicImport(dynamicViewsModules: Record<string, () => Promise<Recordable>>, component: string) {
  const keys = Object.keys(dynamicViewsModules);

  const matchKeys = keys.filter(key => {
    const k = key.replace('../../views', '');
    const startFlag = component.startsWith('/');
    const endFlag = component.endsWith('.vue') || component.endsWith('.tsx');
    const startIndex = startFlag ? 0 : 1;
    const lastIndex = endFlag ? k.length : k.lastIndexOf('.');
    return k.substring(startIndex, lastIndex) === component || k.substring(startIndex, lastIndex) === component + '/index';
  });

  if (matchKeys?.length === 1) {
    const matchKey = matchKeys[0];
    return dynamicViewsModules[matchKey];
  } else if (matchKeys?.length > 1) {
    warn(
      'Please do not create `.vue` and `.TSX` files with the same file name in the same hierarchical directory under the views folder. This will cause dynamic introduction failure',
    );
    return;
  } else {
    // warn('在src/views/下找不到`' + component + '.vue` 或 `' + component + '.tsx`, 请自行创建!');
    return EXCEPTION_COMPONENT;
  }
}

/**
 * 将背景对象变成路由对象
 * Turn background objects into routing objects
 */
export function transformObjToRoute<T = AppRouteModule>(routerList: BackMenu[]): T[] {
  const globSetting = useGlobSetting();
  let routeList: AppRouteModule[] = [];

  function getRouteList(routerList: any) {
    for (const e of routerList) {
      const name = e.enCode.replace(/\./g, '-');
      if (e.type == 0 && e.hasChildren && e.children.length) {
        getRouteList(e.children);
      }
      if (e.type == 1) {
        e.path = '/' + e.enCode;
        if (e.hasChildren && e.children.length) {
          getRouteList(e.children);
        }
      }
      if (e.type == 2) {
        let path = e.urlAddress;
        if (path.indexOf('?') > -1) path = path.split('?')[0];
        e.path = '/' + e.urlAddress;
        const route: AppRouteModule = {
          path: '/' + path,
          component: path,
          name: name,
          meta: {
            title: 'routes.' + name,
            defaultTitle: e.fullName,
            icon: e.icon,
            modelId: e.id,
          },
        };
        routeList.push(route);
      }
      // 表单、字典、报表、门户、流程
      if ([3, 4, 5, 8, 9, 10].indexOf(e.type) > -1) {
        // todo
      }
      // 大屏
      if (e.type == 6) {
        // todo
      }
      // 外链
      if (e.type == 7) {
        const path = e.urlAddress.replace(/\${dataV}/g, globSetting.dataVUrl).replace(/\${ferToken}/g, getToken());
        if (e.linkTarget === '_self') {
          e.path = '/' + e.enCode;
          const route: AppRouteModule = {
            path: '/' + e.enCode,
            component: 'IFRAME',
            name: name,
            meta: {
              title: 'routes.' + name,
              defaultTitle: e.fullName,
              icon: e.icon,
              modelId: e.id,
              frameSrc: path,
            },
          };
          routeList.push(route);
        } else {
          e.path = path;
          const route: AppRouteModule = {
            path: path,
            component: 'IFRAME',
            name: name,
            meta: {
              title: 'routes.' + name,
              defaultTitle: e.fullName,
              icon: e.icon,
              modelId: e.id,
            },
          };
          routeList.push(route);
        }
      }
    }
  }

  getRouteList(routerList);
  asyncImportRoute(routeList);

  const RootRoute: AppRouteRecordRaw = {
    path: '/asyncRoutes',
    name: 'asyncRoutes',
    redirect: PageEnum.BASE_HOME,
    component: LAYOUT,
    meta: {
      title: 'asyncRoutes',
    },
    children: routeList,
  };
  const asyncRouteList: AppRouteRecordRaw[] = [RootRoute];

  return asyncRouteList as unknown as T[];
}

/**
 * 将多级路由转换为 2 级路由
 * Convert multi-level routing to level 2 routing
 */
export function flatMultiLevelRoutes(routeModules: AppRouteModule[]) {
  const modules: AppRouteModule[] = cloneDeep(routeModules);

  for (const routeModule of modules) {
    // 判断级别是否多级路由
    if (!isMultipleRoute(routeModule)) continue;
    // 路由等级提升
    promoteRouteLevel(routeModule);
  }
  return modules;
}

/**
 * 路由等级提升
 * Routing level upgrade
 */
export function promoteRouteLevel(routeModule: AppRouteModule) {
  // 使用 vue-router 拼接菜单
  let router = createRouter({
    routes: [routeModule as unknown as RouteRecordNormalized],
    history: createWebHashHistory(),
  });
  // getRoutes： 获取所有 路由记录的完整列表。
  const routes = router.getRoutes();
  console.log(routes, '1');
  // 将所有子路由添加到二级路由
  addToChildren(routes, routeModule.children || [], routeModule);
  router = null;

  // omit lodash的函数 对传入的item对象的children进行删除
  routeModule.children = routeModule.children?.map(item => omit(item, 'children'));
  console.log(routes, '2');
}

/**
 * 将所有子路由添加到二级路由
 * Add all sub-routes to the secondary route
 */
function addToChildren(routes: RouteRecordNormalized[], children: AppRouteRecordRaw[], routeModule: AppRouteModule) {
  for (const child of children) {
    const route = routes.find(item => item.name === child.name);
    if (!route) {
      continue;
    }
    routeModule.children = routeModule.children || [];
    if (!routeModule.children.find(item => item.name === route.name)) {
      routeModule.children?.push(route as unknown as AppRouteModule);
    }
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule);
    }
  }
}

/**
 * 判断级别是否多级路由（超过 2 级）
 * Determine whether the level exceeds 2 levels
 */
function isMultipleRoute(routeModule: AppRouteModule) {
  if (!routeModule || !Reflect.has(routeModule, 'children') || !routeModule.children?.length) {
    return false;
  }

  const children = routeModule.children;

  let flag = false;
  for (const child of children) {
    if (child.children?.length) {
      flag = true;
      break;
    }
  }
  return flag;
}

import type { App, Component } from 'vue';

import { unref } from 'vue';
import { cloneDeep, isEqual, mergeWith, unionWith } from 'lodash-es';
import { isArray, isObject } from '@/utils/is';

/**
 * 将对象转为为 url 的参数
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '5', b: '6'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  => www.baidu.com?a=5&b=6
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  return /\?$/.test(baseUrl) ? baseUrl + parameters : baseUrl.replace(/\/?$/, '?') + parameters;
}

/**
 递归合并两个对象。
 Recursively merge two objects.
 @param target 目标对象，合并后结果存放于此。The target object to merge into.
 @param source 要合并的源对象。The source object to merge from.
 @returns 合并后的对象。The merged object.
 */
export function deepMerge<T extends object | null | undefined, U extends object | null | undefined>(target: T, source: U): T & U {
  return mergeWith(cloneDeep(target), source, (objValue, srcValue) => {
    if (isObject(objValue) && isObject(srcValue)) {
      return mergeWith(cloneDeep(objValue), srcValue, (prevValue, nextValue) => {
        // 如果是数组，合并数组(去重) - If it is an array, merge the array (remove duplicates)
        return isArray(prevValue) ? unionWith(prevValue, nextValue, isEqual) : undefined;
      });
    }
  });
}

/**
 * 获取动态属性（解构对象中属性的 ref）
 * Dynamic use hook props
 */
export function getDynamicProps<T extends Record<string, unknown>, U>(props: T): Partial<U> {
  const ret: Recordable = {};

  Object.keys(props).map(key => {
    ret[key] = unref((props as Recordable)[key]);
  });

  return ret as Partial<U>;
}

/**
 * vue component global registration
 */
// https://github.com/vant-ui/vant/issues/8302
type EventShim = {
  new (...args: any[]): {
    $props: {
      onClick?: (...args: any[]) => void;
    };
  };
};
export type WithInstall<T> = T & {
  install(app: App): void;
} & EventShim;

export type CustomComponent = Component & { displayName?: string };
/**
 * 包装函数（添加 install 方法），让组件可以通过 app.use() 全局安装，不需要则按需引入即可
 * The wrapper function (adding the install method) enables components to be globally installed through app.use(). If not needed, they can be imported as required
 */
export const withInstall = <T extends CustomComponent>(component: T, alias?: string) => {
  component.install = (app: App) => {
    const compName = component.name || component.displayName;
    if (!compName) return;
    app.component(compName, component);
    if (alias) {
      app.config.globalProperties[alias] = component;
    }
  };
  return component as WithInstall<T>;
};

/**
 * 获取组件挂载的父节点
 * Set ui mount node
 * @description 可以设置弹出框渲染父级容器的外面（类 Teleport）
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  return (node?.parentNode as HTMLElement) ?? document.body;
}

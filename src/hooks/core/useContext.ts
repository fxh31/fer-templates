/**
 * 定义组件全局级上下文对象（类 react useContext）
 * Define the global-level context object of the component
 */
import type { InjectionKey, UnwrapRef } from 'vue';

import { provide, inject, reactive, readonly as defineReadonly } from 'vue';

export interface CreateContextOptions {
  readonly?: boolean;
  createProvider?: boolean;
  native?: boolean;
}

type ShallowUnwrap<T> = {
  [P in keyof T]: UnwrapRef<T[P]>;
};

export function createContext<T>(context: any, key: InjectionKey<T> = Symbol(), options: CreateContextOptions = {}) {
  const { readonly = true, createProvider = false, native = false } = options;

  const state = reactive(context);
  const provideData = readonly ? defineReadonly(state) : state;
  !createProvider && provide(key, native ? context : provideData);

  return { state };
}

// 函数声明（重载签名），兼容内部接口或历史行为保留
export function useContext<T>(key: InjectionKey<T>, native?: boolean): T;

// 函数定义（本项目使用）
export function useContext<T>(key: InjectionKey<T> = Symbol(), defaultValue?: any): ShallowUnwrap<T> {
  return inject(key, defaultValue || {});
}

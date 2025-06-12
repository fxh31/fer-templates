/**
 * 创建 table 上下文，用于提供 table 的一些方法，方便子组件调用
 * Create a table context to provide some methods for the table, making it convenient for child components to call
 */
import type { Ref, ComputedRef } from 'vue';
import type { BasicTableProps, TableActionType } from '../types/table';

import { provide, inject } from 'vue';

const key = Symbol('basic-table');

type Instance = TableActionType & {
  wrapRef: Ref<Nullable<HTMLElement>>;
  getBindValues: ComputedRef<Recordable>;
};

type RetInstance = Omit<Instance, 'getBindValues'> & {
  getBindValues: ComputedRef<BasicTableProps>;
};

export function createTableContext(instance: Instance) {
  provide(key, instance);
}

export function useTableContext(): RetInstance {
  return inject(key) as RetInstance;
}

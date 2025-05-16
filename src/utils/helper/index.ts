import type { Slots } from 'vue';

import { isFunction } from '@/utils/is';

/**
 * 获取插槽（slot）内容，防止空值报错
 * Get slot to prevent empty error
 */
export function getSlot(slots: Slots, slot = 'default', data?: any) {
  if (!slots || !Reflect.has(slots, slot)) {
    return null;
  }
  if (!isFunction(slots[slot])) {
    console.error(`${slot} is not a function!`);
    return null;
  }
  const slotFn = slots[slot];
  if (!slotFn) return null;
  return slotFn(data);
}

/**
 * 对传入的插槽进行封装，返回一个插槽对象
 * Return a slot object
 * @example 
 * {
      default: (data?) =>  getSlot()：VNode,
      header: (data?) => VNode,
      footer: (data?) => VNode
    }
 */
export function extendSlots(slots: Slots, excludeKeys: string[] = []) {
  const slotKeys = Object.keys(slots);
  const ret: any = {};
  slotKeys.map(key => {
    if (excludeKeys.includes(key)) {
      return null;
    }
    ret[key] = (data?: any) => getSlot(slots, key, data);
  });
  return ret;
}

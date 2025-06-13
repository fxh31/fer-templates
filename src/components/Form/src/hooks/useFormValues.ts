/**
 * 处理表单的值，将其传给 useFormEvents 的 handleSubmit 事件
 * Process the values of the form and pass them to the handleSubmit event of useFormEvents
 */
import type { Ref, ComputedRef } from 'vue';
import type { FormProps, FormSchema } from '../types/form';

import { unref } from 'vue';
import { cloneDeep, set } from 'lodash-es';
import { isArray, isFunction, isObject, isString, isNullOrUnDef } from '@/utils/is';
import { dateUtil } from '@/utils/dateUtil';

interface UseFormValuesContext {
  defaultValueRef: Ref<any>;
  getSchema: ComputedRef<FormSchema[]>;
  getProps: ComputedRef<FormProps>;
  formModel: Recordable;
}

/**
 * 解构数组形式的键（key），并将对应的值（value）按顺序赋值给目标对象中的各个子键
 * deconstruct array-link key. This method will mutate the target.
 * @desription 用于处理表单数据中需要将一个数组值拆分成多个字段的情况
 * @example "[name, age]": ["Alice", 25] => { name: "Alice", age: 25 }
 */
function tryDeconstructArray(key: string, value: any, target: Recordable) {
  const pattern = /^\[(.+)\]$/;
  if (pattern.test(key)) {
    const match = key.match(pattern);
    if (match && match[1]) {
      const keys = match[1].split(',');
      value = Array.isArray(value) ? value : [value];
      keys.forEach((k, index) => {
        set(target, k.trim(), value[index]);
      });
      return true;
    }
  }
}

/**
 * 解构对象形式的键（key），并将其值中的对应属性赋值给目标对象中的各个子键
 * deconstruct object-link key. This method will mutate the target
 * @exmaple "{name, age}" = { name: "Alice", age: 25 }
 */
function tryDeconstructObject(key: string, value: any, target: Recordable) {
  const pattern = /^\{(.+)\}$/;
  if (pattern.test(key)) {
    const match = key.match(pattern);
    if (match && match[1]) {
      const keys = match[1].split(',');
      value = isObject(value) ? value : {};
      keys.forEach(k => {
        set(target, k.trim(), value[k.trim()]);
      });
      return true;
    }
  }
}

export function useFormValues({ defaultValueRef, getSchema, formModel, getProps }: UseFormValuesContext) {
  // Processing form values
  function handleFormValues(values: Recordable) {
    if (!isObject(values)) {
      return {};
    }
    const res: Recordable = {};
    for (const item of Object.entries(values)) {
      let [, value] = item;
      const [key] = item;
      if (!key || (isArray(value) && value.length === 0) || isFunction(value)) {
        continue;
      }
      const transformDateFunc = unref(getProps).transformDateFunc;
      if (isObject(value)) {
        value = transformDateFunc?.(value);
      }

      if (isArray(value) && value[0]?.format && value[1]?.format) {
        value = value.map(item => transformDateFunc?.(item));
      }
      // Remove spaces
      if (isString(value)) {
        // remove params from URL
        if (value === '') {
          value = undefined;
        } else {
          value = value.trim();
        }
      }
      if (!tryDeconstructArray(key, value, res) && !tryDeconstructObject(key, value, res)) {
        // 没有解构成功的，按原样赋值
        set(res, key, value);
      }
    }
    return handleRangeTimeValue(res);
  }
  /**
   * @description: Processing time interval parameters
   */
  function handleRangeTimeValue(values: Recordable) {
    const fieldMapToTime = unref(getProps).fieldMapToTime;

    if (!fieldMapToTime || !Array.isArray(fieldMapToTime)) {
      return values;
    }

    for (const [field, [startTimeKey, endTimeKey], format = ''] of fieldMapToTime) {
      if (!field || !startTimeKey || !endTimeKey) {
        continue;
      }
      // If the value to be converted is empty, remove the field
      if (!values[field]) {
        Reflect.deleteProperty(values, field);
        continue;
      }

      const [startTime, endTime]: string[] = values[field];
      if (format) {
        const [startTimeFormat, endTimeFormat] = Array.isArray(format) ? format : [format, format];
        values[startTimeKey] = dateUtil(startTime).format(startTimeFormat);
        values[endTimeKey] = dateUtil(endTime).format(endTimeFormat);
      } else {
        values[startTimeKey] = startTime;
        values[endTimeKey] = endTime;
      }

      Reflect.deleteProperty(values, field);
    }
    return values;
  }

  function initDefault() {
    const schemas = unref(getSchema);
    const obj: Recordable = {};
    schemas.forEach(item => {
      const { defaultValue } = item;
      if (!isNullOrUnDef(defaultValue)) {
        obj[item.field] = defaultValue;

        if (formModel[item.field] === undefined) {
          formModel[item.field] = defaultValue;
        }
      }
    });
    defaultValueRef.value = cloneDeep(obj);
  }

  return { handleFormValues, initDefault };
}

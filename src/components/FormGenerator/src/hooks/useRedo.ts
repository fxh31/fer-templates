import { ref, computed, unref } from 'vue';
import { cloneDeep } from 'lodash-es';
import { isString, isFunction } from '@/utils/is';

export function useRedo() {
  const recordList = ref<any[]>([]);
  const currentRecordIndex = ref(-1);
  const recordLimit = ref(500);

  const getCanUndo = computed(() => currentRecordIndex.value > 0);
  const getCanRedo = computed(() => recordList.value.length > currentRecordIndex.value + 1);

  const initRedo = (limit = 500) => {
    recordList.value = [];
    currentRecordIndex.value = -1;
    recordLimit.value = limit;
  };
  // 新增一条历史纪录
  const addRecord = (json, fullName = '修改') => {
    if (currentRecordIndex.value + 1 < recordList.value.length) {
      recordList.value.splice(currentRecordIndex.value + 1);
    }
    const item = {
      json: isString(json) ? json : cloneDeep(json),
      fullName,
      id: currentRecordIndex.value + 1,
    };
    recordList.value.push(item);
    currentRecordIndex.value++;
    // 限制undo纪录步数
    if (recordList.value.length > recordLimit.value) {
      recordList.value.shift();
      currentRecordIndex.value--;
    }
  };
  // 撤销
  const handleUndo = (callback?) => {
    if (!unref(getCanUndo)) return;
    currentRecordIndex.value--;
    const currRecord = recordList.value[currentRecordIndex.value];
    callback && isFunction(callback) && callback(currRecord.json);
  };
  // 重做
  const handleRedo = (callback?) => {
    if (!unref(getCanRedo)) return;
    currentRecordIndex.value++;
    const currRecord = recordList.value[currentRecordIndex.value];
    callback && isFunction(callback) && callback(currRecord.json);
  };
  // 跳转到指定历史纪录
  const jumpToRecord = (index, callback?) => {
    if (index < 0 || index >= recordList.value.length) return;
    currentRecordIndex.value = index;
    const currRecord = recordList.value[currentRecordIndex.value];
    callback && isFunction(callback) && callback(currRecord.json);
  };

  return {
    initRedo,
    addRecord,
    handleUndo,
    handleRedo,
    getCanUndo,
    getCanRedo,
    recordList,
    currentRecordIndex,
    jumpToRecord,
  };
}

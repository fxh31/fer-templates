/**
 * 页面加载
 * Page loading
 * @description loading
 */
import type { BasicTableProps } from '../types/table';
import type { ComputedRef } from 'vue';

import { ref, unref, computed, watch } from 'vue';

export function useLoading(props: ComputedRef<BasicTableProps>) {
  const loadingRef = ref(unref(props).loading);

  watch(
    () => unref(props).loading,
    loading => {
      loadingRef.value = loading;
    },
  );

  const getLoading = computed(() => unref(loadingRef));

  function setLoading(loading: boolean) {
    loadingRef.value = loading;
  }

  return { getLoading, setLoading };
}

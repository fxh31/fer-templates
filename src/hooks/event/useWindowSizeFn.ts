/**
 * 监听 window resize，防抖优化，注册和移除监听器
 */
import { tryOnMounted, tryOnUnmounted, useDebounceFn } from '@vueuse/core';

interface WindowSizeOptions {
  once?: boolean; // 只监听一次
  immediate?: boolean; // 组件挂载后立刻执行一次回调函数 - Immediately execute the callback function after the component is mounted
  listenerOptions?: AddEventListenerOptions | boolean; // 控制 addEventListener 行为
}

export function useWindowSizeFn<T>(fn: Fn<T>, wait = 150, options?: WindowSizeOptions = {}) {
  let handler = () => {
    fn();
  };
  const handleSize = useDebounceFn(handler, wait);
  handler = handleSize;

  const start = () => {
    if (options && options.immediate) {
      handler();
    }
    window.addEventListener('resize', handler);
  };

  const stop = () => {
    window.removeEventListener('resize', handler);
  };

  // onMounted 之前执行
  tryOnMounted(() => {
    start();
  });

  tryOnUnmounted(() => {
    stop();
  });
  return [start, stop];
}

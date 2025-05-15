/**
 * 利用 requestAnimationFrame 实现滚动 - Implement scrolling using requestAnimationFrame
 */
import { isFunction, isUnDef } from '@/utils/is';
import { ref, unref } from 'vue';

export interface ScrollToParams {
  el: any;
  to: number;
  duration?: number;
  callback?: () => any;
}
// 缓动函数，计算滚动中的动画效果（加速，减速）
const easeInOutQuad = (t: number, b: number, c: number, d: number) => {
  t /= d / 2;
  if (t < 1) {
    return (c / 2) * t * t + b;
  }
  t--;
  return (-c / 2) * (t * (t - 2) - 1) + b;
};
// 设置滚动位置
const move = (el: HTMLElement, amount: number) => {
  el.scrollTop = amount;
};
// 获取当前元素滚动位置
const position = (el: HTMLElement) => {
  return el.scrollTop;
};

export function useScrollTo({ el, to, duration = 500, callback }: ScrollToParams) {
  const isActiveRef = ref(false);
  const start = position(el);
  const change = to - start;
  const increment = 20;
  let currentTime = 0;
  // duration = isUnDef(duration) ? 500 : duration;

  const animateScroll = () => {
    if (!unref(isActiveRef)) {
      return;
    }
    currentTime += increment;
    const val = easeInOutQuad(currentTime, start, change, duration);
    move(el, val);
    if (currentTime < duration && unref(isActiveRef)) {
      requestAnimationFrame(animateScroll);
    } else {
      if (callback && isFunction(callback)) {
        callback();
      }
    }
  };

  const run = () => {
    isActiveRef.value = true;
    animateScroll();
  };

  const stop = () => {
    isActiveRef.value = false;
  };

  return { start: run, stop };
}

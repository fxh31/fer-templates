/**
 * 监听 element 或边框盒子的尺寸变化 - (ResizeObserver) Listen for the size changes of the element or the border box
 */

const isServer = typeof window === 'undefined';

function resizeHandler(entries: any[]) {
  for (const entry of entries) {
    const listeners = entry.target.__resizeListeners__ || [];
    if (listeners.length) {
      listeners.forEach((fn: () => any) => {
        fn();
      });
    }
  }
}

export function addResizeListener(element: any, fn: () => any) {
  if (isServer) return;
  if (!element.__resizeListeners__) {
    element.__resizeListeners__ = [];
    element.__ro__ = new ResizeObserver(resizeHandler);
    element.__ro__.observe(element);
  }
  element.__resizeListeners__.push(fn);
}

export function removeResizeListener(element: any, fn: () => any) {
  if (!element || !element.__resizeListeners__) return;
  element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
  if (!element.__resizeListeners__.length) {
    element.__ro__.disconnect();
  }
}

export interface ViewportOffsetResult {
  left: number;
  top: number;
  right: number;
  bottom: number;
  rightIncludeBody: number;
  bottomIncludeBody: number;
}

export function getBoundingClientRect(element: Element): DOMRect | number {
  if (!element || !element.getBoundingClientRect) {
    return 0;
  }
  return element.getBoundingClientRect();
}

/**
 * 获取一个 DOM 元素相对于视口（浏览器可视区域）的位置和尺寸信息（left、top、right、bottom 等偏移信息）
 * getViewportOffset
 * @description 实现弹出菜单或提示框的自动定位（如 Tooltip、Popover）、判断元素是否在视口内（用于懒加载或动画触发）、计算复杂布局中元素的位置关系、支持响应式设计时的动态调整逻辑
 *
 */
export function getViewportOffset(element: Element): ViewportOffsetResult {
  const doc = document.documentElement;
  // 滚动对象
  const docScrollLeft = doc.scrollLeft;
  const docScrollTop = doc.scrollTop;
  const docClientLeft = doc.clientLeft;
  const docClientTop = doc.clientTop;

  // 获取窗口的滚动偏移量
  const pageXOffset = window.pageXOffset;
  const pageYOffset = window.pageYOffset;

  // 获取元素在视口中的位置
  const box = getBoundingClientRect(element);

  const { left: retLeft, top: rectTop, width: rectWidth, height: rectHeight } = box as DOMRect;

  // 计算基于页面滚动的偏移量
  const scrollLeft = (pageXOffset || docScrollLeft) - (docClientLeft || 0);
  const scrollTop = (pageYOffset || docScrollTop) - (docClientTop || 0);
  const offsetLeft = retLeft + pageXOffset;
  const offsetTop = rectTop + pageYOffset;

  const left = offsetLeft - scrollLeft;
  const top = offsetTop - scrollTop;

  const clientWidth = window.document.documentElement.clientWidth;
  const clientHeight = window.document.documentElement.clientHeight;
  return {
    left: left,
    top: top,
    right: clientWidth - rectWidth - left,
    bottom: clientHeight - rectHeight - top,
    rightIncludeBody: clientWidth - left, // 元素左侧距离视口右侧的距离
    bottomIncludeBody: clientHeight - top, // 元素顶部距离视口底部的距离
  };
}
export function on(element: Element | HTMLElement | Document | Window, event: string, handler: EventListenerOrEventListenerObject): void {
  if (element && event && handler) {
    element.addEventListener(event, handler, false);
  }
}

export function off(element: Element | HTMLElement | Document | Window, event: string, handler: Fn): void {
  if (element && event && handler) {
    element.removeEventListener(event, handler, false);
  }
}

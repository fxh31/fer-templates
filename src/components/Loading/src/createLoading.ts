import type { VNode } from 'vue';
import type { LoadingProps } from './typing';

import { createVNode, render, reactive, h, defineComponent } from 'vue';
import Loading from './Loading.vue';
export function createLoading(props?: Partial<LoadingProps>, target?: HTMLElement, wait = false) {
  let vm: Nullable<VNode> = null;
  const data = reactive({
    tip: '',
    loading: true,
    ...props,
  });

  // 定义组件
  const LoadingWrap = defineComponent({
    render() {
      return h(Loading, { ...data });
    },
  });
  // 创建 vnode
  vm = createVNode(LoadingWrap);

  if (wait) {
    setTimeout(() => {
      // 手动挂载
      render(vm, document.createElement('div'));
    }, 0);
  } else {
    // 手动挂载（挂载之后才会有 el）
    render(vm, document.createElement('div'));
  }
  function open(target: HTMLElement = document.body) {
    if (!vm || !vm.el) {
      return;
    }
    target.appendChild(vm.el as HTMLElement);
  }
  if (target) {
    open(target);
  }

  function close() {
    if (vm?.el && vm.el.parentNode) {
      vm.el.parentNode.removeChild(vm.el);
    }
  }

  return {
    vm,
    close,
    open,
    setTip: (tip: string) => {
      data.tip = tip;
    },
    setLoading: (loading: boolean) => {
      data.loading = loading;
    },
    get loading() {
      return data.loading;
    },
    get $el() {
      return vm?.el as HTMLElement;
    },
  };
}

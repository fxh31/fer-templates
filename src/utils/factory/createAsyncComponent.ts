import { defineAsyncComponent, h } from 'vue';

interface Options {
  // size?: 'default' | 'small' | 'large'; // 用于 Spin 组件的 size 属性
  delay?: number;
  timeout?: number;
  loading?: boolean;
  retry?: boolean;
}

export function createAsyncComponent(loader: Fn, options: Options = {}) {
  const { delay = 100, timeout = 30000, loading = false, retry = true } = options;

  return defineAsyncComponent({
    loader,
    loadingComponent: loading ? h('div', 'loading component, spin...') : undefined,
    timeout,
    delay,
    // errorComponent: retry ? h('div', 'error') : undefined,
    onError: !retry
      ? () => {}
      : (error, retry, fail, attempts) => {
          if (error.message.match(/fetch/) && attempts <= 3) {
            // 重试三次 - retry on fetch errors, 3 max attempts
            retry();
          } else {
            fail();
          }
        },
  });
}

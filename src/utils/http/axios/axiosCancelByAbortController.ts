import type { AxiosRequestConfig, Canceler } from 'axios';

let pendingMap = new Map<string, Canceler>();
export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&');

export class AxiosCanceler {
  addPending(config: AxiosRequestConfig) {
    this.removePending(config);
    const url = getPendingUrl(config);

    const controller = new AbortController();
    config.signal = controller.signal;

    if (!pendingMap.has(url)) {
      pendingMap.set(url, controller);
    }
  }
  removeAllPending() {
    pendingMap.forEach(constroller => {
      constroller.abort();
    });
    pendingMap.clear();
  }
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);

    if (pendingMap.has(url)) {
      const constroller = pendingMap.get(url);
      constroller?.abort();
      pendingMap.delete(url);
    }
  }

  reset(): void {
    pendingMap = new Map<string, Canceler>();
  }
}

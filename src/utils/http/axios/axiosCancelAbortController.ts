import type { AxiosRequestConfig, Canceler } from 'axios';

import axios from 'axios';

export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&');
/**
 * @description: AbortController：原生 JS Web APIs（axios@0.22.0 ^）
 */
export class AxiosCanceler {
  private pendingMap = new Map<string, Canceler>();

  addPending(config: AxiosRequestConfig) {
    this.removePending(config);
    const url = getPendingUrl(config);

    const controller = new AbortController();
    config.signal = config.signal || controller.signal;

    if (!pendingMap.has(url)) {
      pendingMap.set(url, controller);
    }
  }

  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);

    if (this.pendingMap.has(url)) {
      const controller = this.pendingMap.get(url);
      controller && controller.abort();
      this.pendingMap.delete(url);
    }
  }

  removeAllPending() {
    this.pendingMap.forEach(constroller => {
      constroller.abort();
    });
    this.pendingMap.clear();
  }

  reset(): void {
    this.pendingMap = new Map<string, Canceler>();
  }
}

import type { AxiosRequestConfig, Canceler } from 'axios';

import axios from 'axios';
import { isFunction } from '@/utils/is';

export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url].join('&');
/**
 * @description: CancelToken
 */
export class AxiosCanceler {
  private pendingMap = new Map<string, Canceler>();

  addPending(config: AxiosRequestConfig) {
    this.removePending(config);
    const url = getPendingUrl(config);

    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken(cancel => {
        if (!this.pendingMap.has(url)) {
          this.pendingMap.set(url, cancel);
        }
      });
  }

  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);

    if (this.pendingMap.has(url)) {
      const cancel = this.pendingMap.get(url);
      cancel && cancel();
      this.pendingMap.delete(url);
    }
  }

  removeAllPending() {
    this.pendingMap.forEach(cancel => {
      cancel && isFunction(cancel) && cancel();
    });
    this.pendingMap.clear();
  }

  reset(): void {
    this.pendingMap = new Map<string, Canceler>();
  }
}

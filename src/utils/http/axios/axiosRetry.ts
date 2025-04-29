import type { AxiosError, AxiosInstance } from 'axios';

/**
 * @description: Request retry mechanism
 */

export class AxiosRetry {
  retry(axiosInstance: AxiosInstance, error: AxiosError) {
    const { config } = error.response;
    const { waitTime, count } = config?.requestOptions?.retryRequest;

    config.__retryCount = config.__retryCount || 0;
    if (config.__retryCount >= count) {
      return Promise.reject(error);
    }
    config.__retryCount += 1;
  }
}

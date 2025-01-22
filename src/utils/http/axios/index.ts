// axios 配置
import type { AxiosInstance, AxiosResponse, AxiosRequestConfig } from 'axios';
import type { RequestOptions, Result } from '#/axios';
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform';
import { clone } from 'lodash-es';
import axios from 'axios';

import { RequestEnum, ResultEnum, ContentTypeEnum } from '@/enums/httpEnum';

import { VAxios } from './Axios';
import { checkStatus } from './checkStatus';
import { AxiosRetry } from './axiosRetry';
import { joinTimestamp, formatRequestDate } from './helper';
import { setObjToUrlParams, deepMerge } from '@/utils';
import { isString, isObject } from '@/utils/is';
import { getAppEnvConfig } from '@/utils/env';

const { VITE_GLOB_API_URL } = getAppEnvConfig();

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 处理响应数据。如果数据不是预期格式，可直接抛出错误
   */
  transformResponseHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformResponse, isReturnNativeResponse } = options;
    // 是否返回原生响应头 比如：需要获取响应头时使用该属性
    if (isReturnNativeResponse) {
      return res;
    }

    // 不进行任何处理，直接返回
    // 用于页面代码可能需要直接获取code,data,msg这些信息时开启
    if (!isTransformResponse) {
      return res.data;
    }

    // 错误的时候返回
    if (!res.data) {
      // return '[HTTP] Request has no return value';
      throw new Error('请求出错，请稍候重试');
    }

    // code,data,msg 为前后端协调的统一字段
    const { code, msg } = res.data;

    // 返回请求成功的数据（todo）
    const hasSuccess = res.data && isObject(res.data) && Reflect.has(res.data, 'code') && code === ResultEnum.SUCCESS;
    if (hasSuccess) {
      return res.data;
    }

    // 根据 code 执行不同操作（todo）
    let errorMsg = '';
    switch (code) {
      case ResultEnum.TOKEN_TIMEOUT:
      // todo ...
      case ResultEnum.TOKEN_LOGGED:
      // todo ...
      case ResultEnum.TOKEN_ERROR:
        errorMsg = msg || '登录超时,请重新登录!';
        // todo ...
        break;
      default:
        errorMsg = msg || '请求出错，请稍候重试';
    }

    // todo：进行一些错误 model 和 message 的处理

    // 抛出异常
    throw new Error(errorMsg);
  },
  /**
   * @description: 请求之前处理 config
   */
  beforeRequestHook: (config: CreateAxiosOptions, options: RequestOptions): AxiosRequestConfig => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;

    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }
    if (apiUrl && isString(apiUrl) && !/https?:\/\//.test(config.url || '')) {
      config.url = `${apiUrl}${config.url}`;
    }

    const params = config.params || config.data || {};
    const data = config.data || false;
    formatDate && data && !isString(data) && formatRequestDate(data);

    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    } else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (Reflect.has(config, 'data') && config.data && (Object.keys(config.data).length > 0 || config.data instanceof FormData)) {
          config.data = data;
          config.params = undefined;
        } else {
          // 非GET请求如果没有提供 data，则将 params 视为 data
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url as string, Object.assign({}, config.params, config.data));
        }
        // todo：将 config.data 进行数据加密
      } else {
        // 兼容restful风格
        config.url = config.url + params;
        config.params = undefined;
      }
    }
    return config;
  },
  /**
   * @description: 请求拦截器处理
   */
  requestInterceptors: (config: AxiosRequestConfig, options: CreateAxiosOptions): AxiosRequestConfig => {
    // todo：用于处理请求头，可以添加自定义请求头字段，Authorization 的 token（jwt）
    const token = '';
    if (token) {
      // Bearer
      config.headers.Authorization = options.authenticationScheme ? `${options.authenticationScheme} ${token}` : token;
    }

    return config;
  },
  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
    // todo：进行一些数据解密处理

    return res;
  },
  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (axiosInstance: AxiosInstance, error: any) => {
    const { response, code, message, config } = error || {};
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
    const msg: string = response?.data?.error?.message ?? '';
    const err: string = error?.toString?.() ?? '';
    let errMessage = '';

    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }

    try {
      if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
        errMessage = '接口请求超时,请刷新页面重试!';
      }
      if (err?.includes('Network Error')) {
        errMessage = '网络异常，请检查您的网络连接是否正常!';
      }

      if (errMessage) {
        // todo：进行一些错误 model 和 message 的处理

        return Promise.reject(error);
      }
    } catch (error) {
      throw new Error(error as unknown as string);
    }

    checkStatus(error?.response?.status, msg, errorMessageMode);

    // 添加自动重试机制 保险起见 只针对GET请求
    const retryRequest = new AxiosRetry();
    const { isOpenRetry } = config.requestOptions.retryRequest;
    config.method?.toUpperCase() === RequestEnum.GET &&
      isOpenRetry &&
      // @ts-ignore
      retryRequest.retry(axiosInstance, error);
    return Promise.reject(error);
  }
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    // 深度合并
    deepMerge(
      {
        // authenticationScheme: 'Bearer',
        authenticationScheme: '',
        timeout: 1000 * 1000,
        // 基础接口地址
        // baseURL: VITE_GLOB_API_URL,

        headers: { 'Content-Type': ContentTypeEnum.JSON },
        // 如果是form-data格式
        // headers: { 'Content-Type': ContentTypeEnum.FORM_URLENCODED },
        // 数据处理方式
        transform: clone(transform),
        // 配置项，下面的选项都可以在独立的接口请求中覆盖
        requestOptions: {
          // 默认将prefix 添加到url
          joinPrefix: true,
          // 是否返回原生响应头 比如：需要获取响应头时使用该属性
          isReturnNativeResponse: false,
          // 需要对返回数据进行处理
          isTransformResponse: true,
          // post请求的时候添加参数到url
          joinParamsToUrl: false,
          // 格式化提交参数时间
          formatDate: true,
          // 消息提示类型
          errorMessageMode: 'message',
          // 接口地址
          apiUrl: VITE_GLOB_API_URL,
          // 接口拼接地址
          urlPrefix: '',
          //  是否加入时间戳
          joinTime: true,
          // 忽略重复请求
          ignoreCancelToken: true,
          // 是否携带token
          withToken: true,
          // 是否加密
          useCipher: false,
          retryRequest: {
            isOpenRetry: false,
            count: 5,
            waitTime: 100
          }
        }
      },
      opt || {}
    )
  );
}

export const defHttp = createAxios();

// 其他接口示例
// export const otherHttp = createAxios({
//   requestOptions: {
//     apiUrl: 'xxx',
//     urlPrefix: 'xxx',
//   },
// });

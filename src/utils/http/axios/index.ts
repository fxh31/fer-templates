import type { AxiosInstance, AxiosResponse } from 'axios';
import type { AxiosTransform, CreateAxiosOptions } from './axiosTransform';
import type { RequestOptions, Result } from '#/axios';

import { clone } from 'lodash-es';
import axios from 'axios';
import { RequestEnum, ResultEnum, ContentTypeEnum } from '@/enums/httpEnum';
import { useGlobSetting } from '@/hooks/setting';
import { deepMerge } from '@/utils';
import { AxiosRetry } from '@/utils/http/axios/axiosRetry';
import { isString, isObject } from '@/utils/is';
import { VAxios } from './Axios';
import { joinTimestamp, formatRequestDate } from './helper';
import { AesEncryption } from '@/utils/cipher';

const globSetting = useGlobSetting();
const urlPrefix = globSetting.urlPrefix;
const aesEncryption = new AesEncryption({ useHex: true });

/**
 * @description: 数据处理，方便区分多种处理方式
 */
const transform: AxiosTransform = {
  /**
   * @description: 请求前的配置处理
   */
  beforeRequestHook: (config, options) => {
    const { apiUrl, joinPrefix, joinParamsToUrl, formatDate, joinTime = true, urlPrefix } = options;
    console.log(config, options);
    // 处理 url
    if (joinPrefix) {
      config.url = `${urlPrefix}${config.url}`;
    }
    if (apiUrl && isString(apiUrl) && !/https?:\/\//.test(config.url || '')) {
      config.url = `${apiUrl}${config.url}`;
    }

    // data 处理
    const params = config.params || config.data || {};
    const data = config.data || false;
    formatDate && data && !isString(data) && formatRequestDate(data);

    // tips：chorme 浏览器出现打印后置问题(params)
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (!isString(params)) {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据。
        config.params = Object.assign(params || {}, joinTimestamp(joinTime, false));
      } else {
        // 兼容restful风格
        config.url = config.url + params + `${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      }
    }else {
      if (!isString(params)) {
        formatDate && formatRequestDate(params);
        if (Reflect.has(config, 'data') && config.data && (Object.keys(config.data).length > 0 || config.data instanceof FormData)) {
          config.data = data;
          config.params = undefined;
        } else {
          // 非GET请求如果没有提供data，则将params视为data
          config.data = params;
          config.params = undefined;
        }
        if (joinParamsToUrl) {
          config.url = setObjToUrlParams(config.url as string, Object.assign({}, config.params, config.data));
        }
        // 数据加密
        if (config?.requestOptions?.useCipher && config.data) {
          const resultStr = aesEncryption.encryptByAES(JSON.stringify(config.data));
          if (resultStr) config.data = { encryptData: resultStr };
        }
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
  requestInterceptors: (config, options) => {
    // 请求之前处理config
    // (config as Recordable).headers['fer-origin'] = 'pc';
    (config as Recordable).headers['vue-version'] = '3';
    // todo：获取 token 添加到请求头，国际化操作

    // const token = getToken();
    // if (token && (config as Recordable)?.requestOptions?.withToken !== false) {
    //   // jwt token
    //   (config as Recordable).headers.Authorization = options.authenticationScheme ? `${options.authenticationScheme} ${token}` : token;
    // }
    return config;
  },
  /**
   * @description: 响应拦截器处理
   */
  responseInterceptors: (res: AxiosResponse<any>) => {
     // 数据解密
     if ((res.config as any)?.requestOptions?.useCipher) {
      const resultStr = aesEncryption.decryptByAES(res.data as unknown as string);
      if (resultStr) res.data = JSON.parse(resultStr);
    }
    return res;
  },
  /**
   * @description: 处理响应数据（如果数据不是预期格式，可直接抛出错误）
   */
  transformResponseHook: (res: AxiosResponse<Result>, options: RequestOptions) => {
    const { isTransformResponse, isReturnNativeResponse } = options;

    // 是否返回原生响应头（需要获取响应头时使用该属性）
    if (isReturnNativeResponse) {
      return res;
    }
    // 用于页面代码可能需要直接获取code,data,msg这些信息时开启
    if (!isTransformResponse) {
      return res.data;
    }
    // 错误时返回 （不存在返回值，data 为空或不存在）
    if (!res.data) {
      throw new Error('HTTP 没有返回 data');
    }
    // code,data,msg 为后台统一的字段，如有需要在 types.ts 内修改为项目自己的接口返回格式
    const { code, msg } = res.data;
    
    const hasSuccess = res.data && isObject(res.data) && Reflect.has(res.data, 'code') && code === ResultEnum.SUCCESS;
    if (hasSuccess) {
      return res.data;
    }
    
    // 针对其他 code 情况做处理（如果不希望中断当前请求，请return数据，否则直接抛出异常即可）
    let errorMsg = '';
    switch (code) {
      case ResultEnum.TOKEN_TIMEOUT:
      case ResultEnum.TOKEN_LOGGED:
      case ResultEnum.TOKEN_ERROR:
        errorMsg = msg;
        break;
      default:
        errorMsg = msg;
    }
    
    // 全局处理：弹窗、提示、忽略
    if (options.errorMessageMode === 'modal') {

    } else if (options.errorMessageMode === 'message') {

    }
    throw new Error(errorMsg);
  },
  /**
   * @description: 响应错误处理
   */
  responseInterceptorsCatch: (axiosInstance: AxiosInstance, error: any) => {
    // todo：添加响应错误日志、提示信息
    const { response, code, message, config } = error || {};
    const errorMessageMode = config?.requestOptions?.errorMessageMode || 'none';
    const msg: string = response?.data?.error?.message ?? '';
    const err: string = error?.toString?.() ?? '';
    let errMessage = '';
    
    if (axios.isCancel(error)) {
      return Promise.reject(error);
    }
    
    // 添加自动重试机制 保险起见 只针对GET请求
    const retryRequest = new AxiosRetry();
    const { isOpenRetry } = config.requestOptions.retryRequest;
    config.method?.toUpperCase() === RequestEnum.GET &&
      isOpenRetry &&
      // @ts-ignore
      retryRequest.retry(axiosInstance, error);
    return Promise.reject(error);
  },
};

function createAxios(opt?: Partial<CreateAxiosOptions>) {
  return new VAxios(
    deepMerge(
      {
        // See https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes
        // authentication schemes，e.g: Bearer
        // authenticationScheme: 'Bearer',
        authenticationScheme: '',
        timeout: 1000 * 1000,
        // 基础接口地址
        // baseURL: globSetting.apiUrl,

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
          apiUrl: globSetting.apiUrl,
          // 接口拼接地址
          urlPrefix: urlPrefix,
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
            waitTime: 100,
          },
        },
      },
      opt || {},
    ),
  );
}

export const defHttp = createAxios();

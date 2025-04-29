export interface RequestOptions {
  // 将请求参数拼接到 url - Splicing request parameters to url
  joinParamsToUrl?: boolean;
  // 格式化请求参数时间 - Format request parameter time
  formatDate?: boolean;
  // 是否处理请求结果 - Whether to process the request result
  isTransformResponse?: boolean;
  // 是否返回原生响应头 - Whether to return native response headers
  // For example: use this attribute when you need to get the response headers
  isReturnNativeResponse?: boolean;
  // 地址是否拼接前缀 - Whether to join url
  joinPrefix?: boolean;
  // Interface address, use the default apiUrl if you leave it blank
  // 接口地址，不写就使用默认地址
  apiUrl?: string;
  // 请接口拼接地址
  urlPrefix?: string;
  // 错误提示模式（message、modal等）- Error message prompt type
  errorMessageMode?: ErrorMessageMode;
  // 是否添加时间戳 - Whether to add a timestamp
  joinTime?: boolean;
  // 是否忽略重复请求
  ignoreCancelToken?: boolean;
  // 是否在将 token 添加到请求头 - Whether to send token in header
  withToken?: boolean;
  // 是否加密
  useCipher?: boolean;
  // 请求重试机制
  retryRequest?: RetryRequest;
}

export type ErrorMessageMode = 'none' | 'modal' | 'message' | undefined;

export interface RetryRequest {
  isOpenRetry: boolean;
  count: number;
  waitTime: number;
}

export interface Result<T = any> {
  code: number;
  msg: string;
  data?: T;
}

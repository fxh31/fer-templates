import type { AxiosResponse, AxiosRequestConfig } from 'axios';

import axios from 'axios';
import qs from 'qs';

import { getAppEnvConfig } from '@/utils/env';

const { VITE_GLOB_API_URL } = getAppEnvConfig();

const CODE_MESSAGE: any = {
  200: '服务器成功返回请求数据',
  201: '新建或修改数据成功',
  202: '一个请求已经进入后台排队(异步任务)',
  204: '删除数据成功',
  400: '发出信息有误',
  401: '用户没有权限(令牌失效、用户名、密码错误、登录过期)',
  402: '令牌过期',
  403: '用户得到授权，但是访问是被禁止的',
  404: '访问资源不存在',
  406: '请求格式不可得',
  410: '请求资源被永久删除，且不会被看到',
  500: '服务器发生错误',
  502: '网关错误',
  503: '服务不可用，服务器暂时过载或维护',
  504: '网关超时'
};

/**
 * @description 初始化 axios 实例
 */
const instance = axios.create({
  baseURL: VITE_GLOB_API_URL,
  timeout: 10000
});

/**
 * @description:  请求拦截器 - 检查 token，配置请求头报文等
 */
instance.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    // 设置 token
    const auth_token = localStorage.getItem('auth_token');
    if (auth_token) {
      config.headers['Authorization'] = `Bearer ${auth_token}`;
    }

    // 设置 Content-Type，qs 库序列化数据
    if (config.data && config.headers['Content-Type'] === 'application/x-www-form-urlencoded;charset=UTF-8') {
      config.data = qs.stringify(config.data);
    }

    // todo：设置请求的防抖节流，消息反馈等
    return config;
  },
  err => {
    return Promise.reject(err);
  }
);

/**
 * @description:  响应拦截器 - 拦截数据操作，检查接口状态码等
 */
instance.interceptors.response.use(
  ({ data, status, statusText }: AxiosResponse) => {
    switch (code) {
      case 200:
        return data;
      case 401:
        // 重定向到 login 页面，重置操作等
        break;
      case 403:
        // 导航到 403 页面
        break;
    }

    // 异常消息处理
    const errMsg = `${data && data['msg'] ? data['msg'] : CODE_MESSAGE[code] ? CODE_MESSAGE[code] : statusText}`;
    // todo：错误提示处理

    return Promise.reject(data);
  },
  (err: AxiosError) => {
    // todo：错误提示处理
    return Promise.reject(err);
  }
);

const handleData = async;

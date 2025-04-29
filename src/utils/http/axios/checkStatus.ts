import type { ErrorMessageMode } from '#/axios';

export function checkStatus(status: number, msg: string, errorMessageMode: ErrorMessageMode = 'message'): void {
  let errMessage = '';

  switch (status) {
    case 400:
      errMessage = `${msg}`;
      break;
    case 401:
      // 401: Not logged in
      // 跳到登录页面，携带当前请求的 url - Jump to the login page if not logged in, and carry the path of the current page.
      // 登录成功后返回当前的 url - Return to the current page after successful login. This step needs to be operated on the login page.
      break;
    case 403:
      break;
    case 404:
      errMessage = '请求出错(404)';
      break;
    case 405:
      errMessage = '';
      break;
    case 408:
      errMessage = '';
      break;
    case 500:
      errMessage = '';
      break;
    case 501:
      errMessage = '';
      break;
    case 502:
      errMessage = '';
      break;
    case 503:
      errMessage = '';
      break;
    case 504:
      errMessage = '';
      break;
    case 505:
      errMessage = '';
      break;
    default:
  }

  if (errMessage) {
    if (errorMessageMode === 'modal') {
      // todo
    } else if (errorMessageMode === 'message') {
      // todo
    }
  }
}

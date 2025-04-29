import { defHttp } from '@/utils/http/axios';

enum Api {
  Login = '/api/oauth/Login',
}

export function testGet() {
  return defHttp.get({ url: Api.Login });
}

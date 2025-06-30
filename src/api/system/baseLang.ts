import { defHttp } from '@/utils/http/axios';

enum Api {
  Prefix = '/api/system/BaseLang',
}

// 获取语言列表
export function getBaseLangList(data) {
  // return defHttp.get({ url: Api.Prefix, data });
  return Promise.resolve({
    code: 200,
    data: [],
  });
}
// 新建语言
export function create(data) {
  return defHttp.post({ url: Api.Prefix, data });
}
// 修改语言
export function update(data) {
  return defHttp.put({ url: Api.Prefix + '/' + data.id, data });
}
// 获取语言
export function getInfo(id) {
  return defHttp.get({ url: Api.Prefix + '/' + id });
}
// 删除语言
export function delBaseLang(id) {
  return defHttp.delete({ url: Api.Prefix + '/' + id });
}
// 获取语言内容
export function getLangJson() {
  return defHttp.get({ url: Api.Prefix + '/LangJson' });
}
// 导入模板下载
export function templateDownload() {
  return defHttp.get({ url: Api.Prefix + `/TemplateDownload` });
}
// 导入数据
export function importData(data) {
  return defHttp.post({ url: Api.Prefix + `/ImportData`, data });
}

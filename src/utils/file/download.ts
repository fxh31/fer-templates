import { openWindow } from '..';
import { dataURLtoBlob, urlToBase64 } from './base64Convert';
import { useGlobSetting } from '@/hooks/setting';
import { isDevMode } from '@/utils/env';

/**
 * 利用 a 标签通过 Blob 数据触发文件下载
 * Trigger file download using the "a" tag with Blob data
 * @param data
 * @param filename 下载文件名
 * @param mime 文件 MIME 类型（用于表示文档、文件或字节流的性质和格式）
 * @param bom 数据类型（不可变、原始数据的类对象）
 */
export function downloadByData(data: BlobPart, filename: string, mime?: string, bom?: BlobPart) {
  const blobData = typeof bom !== 'undefined' ? [bom, data] : [data];
  const blob = new Blob(blobData, { type: mime || 'application/octet-stream' }); // 默认通用二进制流

  // 创建一个临时链接，利用 a 标签进行下载
  const blobURL = window.URL.createObjectURL(blob);
  const tempLink = document.createElement('a');
  tempLink.style.display = 'none';
  tempLink.href = blobURL;
  tempLink.setAttribute('download', filename);
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank');
  }
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  window.URL.revokeObjectURL(blobURL); // 释放 url.createObjectURL 创建的对象 URL
}

// 将 Base64 编码的数据（如 Data URL） 转换为 Blob 对象
export function downloadByBase64(buf: string, filename: string, mime?: string, bom?: BlobPart) {
  const base64Buf = dataURLtoBlob(buf);
  downloadByData(base64Buf, filename, mime, bom);
}

// 从一个 远程图片 URL 下载图片并将其转换为 Base64 并下载
export function downloadByOnlineUrl(url: string, filename: string, mime?: string, bom?: BlobPart) {
  urlToBase64(url).then(base64 => {
    downloadByBase64(base64, filename, mime, bom);
  });
}

/**
 * 根据文件的 url 地址下载文件（从后端接口下载文件，远程文件下载，需动态拼接文件名和处理代理路径）
 * Download file according to file address
 */
export function downloadByUrl({ url, target = '_blank', fileName }: { url: string; target?: TargetContext; fileName?: string }): boolean {
  if (!url) return false;
  const globSetting = useGlobSetting();
  const isChrome = window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1;
  const isSafari = window.navigator.userAgent.toLowerCase().indexOf('safari') > -1;
  const isFirefox = window.navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

  if (!/https?:\/\//.test(url) && url.indexOf('data:image/png;base64') < 0) url = globSetting.apiUrl + url;
  if (isDevMode() && isFirefox) {
    const VITE_PROXY: any = import.meta.env.VITE_PROXY || '';
    const proxyList = import.meta.env.VITE_PROXY ? JSON.parse(VITE_PROXY) : [];
    for (const [prefix, target] of proxyList) {
      if (prefix === globSetting.apiUrl) {
        url = url.replace(prefix, target);
        break;
      }
    }
  }
  if (fileName && url.indexOf('data:image/png;base64') < 0 && url.indexOf('&name=') < 0 && url.indexOf('?name=') < 0) {
    url = url + (url.indexOf('?') > -1 ? `&name=${encodeURIComponent(fileName)}` : `?name=${encodeURIComponent(fileName)}`);
  }
  if (/(iP)/g.test(window.navigator.userAgent)) {
    console.error('Your browser does not support download!');
    return false;
  }
  if (isChrome || isSafari || isFirefox) {
    const link = document.createElement('a');
    link.href = url;
    link.download = fileName || '';
    if (document.createEvent) {
      const e = document.createEvent('MouseEvents');
      e.initEvent('click', true, true);
      link.dispatchEvent(e);
      return true;
    }
  }
  if (url.indexOf('?') === -1) {
    url += '?download';
  }
  // 兼容性处理（兜底方案）
  openWindow(url, { target });
  return true;
}

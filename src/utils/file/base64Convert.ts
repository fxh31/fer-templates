/**
 * 将 Base64 编码的数据 URL 转换为浏览器中的 Blob 对象，以便进行文件操作（如下载、上传等）。
 * @param base64Buf
 * @returns Blob
 */
export function dataURLtoBlob(base64Buf: string): Blob {
  const arr = base64Buf.split(',');
  const typeItem = arr[0];
  const mime = typeItem.match(/:(.*?);/)![1];
  const bstr = window.atob(arr[1]);

  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

/**
 * 将一个远程图片 URL 转换为 Base64 编码的 Data URL，以便在前端进行图像处理、缓存或上传等操作
 * Convert a remote image URL to a Base64 encoded Data URL, so that image processing, caching or uploading operations can be performed on the front end
 * @param url
 * @param mineType
 */
export function urlToBase64(url: string, mineType?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let canvas = document.createElement('CANVAS') as Nullable<HTMLCanvasElement>;
    const ctx = canvas!.getContext('2d'); // 调用 Canvas API 获取 2D 绘图上下文对象

    const img = new Image();
    img.crossOrigin = '';
    // 确保 img 加载完成
    img.onload = function () {
      if (!canvas || !ctx) {
        return reject();
      }
      canvas.height = img.height;
      canvas.width = img.width;
      ctx.drawImage(img, 0, 0);
      const dataURL = canvas.toDataURL(mineType || 'image/png'); // 将画布内容转换为 Base64 编码的 Data URL
      canvas = null;
      resolve(dataURL);
    };
    img.src = url;
  });
}

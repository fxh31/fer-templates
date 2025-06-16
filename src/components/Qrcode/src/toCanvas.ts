/**
 * 将二维码绘制在 canvas 元素上
 * Draw the QR code on the canvas element
 */
import type { RenderQrCodeParams } from './typing';

import { renderQrCode } from './drawCanvas';
import { drawLogo } from './drawLogo';
export const toCanvas = (options: RenderQrCodeParams) => {
  return renderQrCode(options)
    .then(() => {
      return options;
    })
    .then(drawLogo) as Promise<string>;
};

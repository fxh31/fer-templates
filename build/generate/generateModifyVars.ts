/**
 * less global variable
 * ant design color
 */

import { resolve } from 'path';

import { generate } from '@ant-design/colors';
import { theme } from 'ant-design-vue/lib';
import { primaryColor } from '../config/themeConfig';

const { defaultAlgorithm, defaultSeed } = theme;

function generateAntColors(color: string, theme: 'default' | 'dark' = 'default') {
  return generate(color, {
    theme,
  });
}

export function generateModifyVars() {
  const palettes = generateAntColors(primaryColor);
  const primary = palettes[5];

  const primaryColorObj: Record<string, string> = {};

  for (let index = 0; index < 10; index++) {
    primaryColorObj[`primary-${index + 1}`] = palettes[index];
  }

  return {
    // hack: `true;@import (reference) './src/design/config.less'`,
    hack: `true; @import (reference) "${resolve('src/design/config.less')}";`,
    'info-color': 'blue',
    'primary-color': primary,
    ...primaryColorObj,
    'success-color': '#55D187', //  Success color
    'error-color': '#ED6F6F', //  False color
    'warning-color': '#EFBD47', //   Warning color
    'btn-info-color': '#909399',
    'text-color-secondary': 'rgba(0, 0, 0, 0.45)',
    'text-color': '#c9d1d9', // todo: fix text-color
    // ---
    'component-background': '#151515',
  };
}

import { resolve } from 'path';

/**
 * less global variable
 */
export function generateModifyVars() {
  return {
    // hack: `true;@import (reference) './src/design/config.less'`,
    hack: `true; @import (reference) "${resolve('src/design/config.less')}";`,
    'info-color': 'blue',
    'primary-color': 'blue',
    'success-color': '#55D187', //  Success color
    'error-color': '#ED6F6F', //  False color
    'warning-color': '#EFBD47', //   Warning color
    'btn-info-color': '#909399',
    'text-color-secondary': 'rgba(0, 0, 0, 0.45)',
  };
}

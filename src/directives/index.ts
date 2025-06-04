import type { App } from 'vue';

import { setupLoadingDirective } from './loading';
import { setupClickOutsideDirective } from './clickOutside';
export function setupGlobDirectives(app: App) {
  setupLoadingDirective(app);
  setupClickOutsideDirective(app);
}

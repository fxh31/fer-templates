import type { App } from 'vue';

import { setupClickOutsideDirective } from './clickOutside';
export function setupGlobDirectives(app: App) {
  setupClickOutsideDirective(app);
}

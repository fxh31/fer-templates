// 初始化项目配置

import { useLocaleStore } from '@/stores/modules/locale';
export function initAppConfigStore() {
  // todo：处理项目元数据，配置主题等

  // 初始化国际化语言
  const localeStore = useLocaleStore();
  localeStore.initLocale();
}

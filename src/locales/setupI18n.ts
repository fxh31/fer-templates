import type { App } from 'vue';
import type { I18n, I18nOptions } from 'vue-i18n';

import { createI18n } from 'vue-i18n';
import { setHtmlPageLang, setLoadLocalePool } from './helper';
import { localeSetting } from '@/settings/localeSetting';
import { useLocaleStore } from '@/stores/modules/locale';

export let i18n: ReturnType<typeof createI18n>;

const { fallback, availableLocales } = localeSetting;
async function createI18nOptions(): Promise<I18nOptions> {
  const localeStore = useLocaleStore();
  const locale = localeStore.getLocale;
  const defaultLocal = await import(`./lang/${locale}.ts`);
  const message = defaultLocal.default?.message ?? {};

  setHtmlPageLang(locale);
  setLoadLocalePool(loadLocalePool => {
    loadLocalePool.push(locale);
  });

  return {
    legacy: false, // 兼容 vue3 composition API - you must set `false`, to use Composition API
    locale,
    fallbackLocale: fallback, // 找不到对应翻译 key 时回退到指定语言（有的语言写了有得还没写）
    messages: {
      [locale]: message,
    },
    availableLocales: availableLocales,
    sync: true, // 同步根组件语言到子组件 - If you don’t want to inherit locale from global scope, you need to set sync of i18n component option to false.
    silentTranslationWarn: false, // true - warning off
    missingWarn: false,
    silentFallbackWarn: true,
  };
}

// setup i18n instance with glob
export async function setupI18n(app: App) {
  const options = await createI18nOptions();
  i18n = createI18n(options) as I18n;
  app.use(i18n);
}

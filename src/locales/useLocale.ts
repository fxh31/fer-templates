/**
 * 多语言 hook 函数
 * Multi-language related operations
 */
import type { LocaleType } from '#/config';

import { unref, computed } from 'vue';
import { i18n } from './setupI18n';
import { loadLocalePool, setHtmlPageLang } from './helper';
import { useLocaleStore } from '@/store/modules/locale';
import { localeSetting } from '@/settings/localeSetting';

interface LangModule {
  message: Recordable;
  dateLocale: Recordable;
  dateLocaleName: string;
}

const { availableLocales } = localeSetting;

function setI18nLanguage(locale: LocaleType) {
  const localeStore = useLocaleStore();

  if (i18n.mode === 'legacy') {
    i18n.global.locale = locale; // vue2
  } else {
    (i18n.global.locale as any).value = locale; // vue3 - composition
  }

  localeStore.setLocaleInfo({ locale });
  setHtmlPageLang(locale);
}

export function useLocale() {
  const localeStore = useLocaleStore();
  const getLocale = computed<LocaleType>(() => localeStore.getLocale);
  const getShowLocalePicker = computed(() => localeStore.getShowPicker);

  function setLocale(locale: LocaleType, message) {
    const globalI18n = i18n.global;
    globalI18n.setLocaleMessage(locale, message);
    loadLocalePool.push(locale);
    setI18nLanguage(locale);
  }

  /**
   * 切换语言
   * Switching the language will change the locale of useI18n and submit to configuration modification
   */
  async function changeLocale(locale: LocaleType) {
    const globalI18n = i18n.global;
    const currentLocale = unref(globalI18n.locale);
    if (currentLocale === locale) {
      return locale;
    }

    if (loadLocalePool.includes(locale)) {
      setI18nLanguage(locale);
      return locale;
    }

    if (!availableLocales.includes(locale)) locale = 'zh_CN';
    const langModule = ((await import(`./lang/${locale}.ts`)) as any).default as LangModule;
    if (!langModule) return;

    const { message } = langModule;

    globalI18n.setLocaleMessage(locale, message);
    loadLocalePool.push(locale);

    setI18nLanguage(locale);
    return locale;
  }

  // 动态拉取国际化 json 文件
  async function initLocale(locale: LocaleType) {
    // todo: 从后端拉取语言文件替换 -  const res = await getLangJson();
    const res = {};
    if (!res || !res.data) return;
    const message = JSON.parse(res.data);
    if (!availableLocales.includes(locale)) locale = 'zh_CN';
    const langModule = ((await import(`./lang/${locale}.ts`)) as any).default as LangModule;
    if (!langModule) return setLocale(locale, message);
    const { message: defaultMessage } = langModule;
    setLocale(locale, { ...defaultMessage, ...message });
  }

  return {
    getLocale,
    getShowLocalePicker,
    changeLocale,
    initLocale,
  };
}

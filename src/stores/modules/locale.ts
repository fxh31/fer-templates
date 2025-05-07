import type { LocaleSetting, LocaleType } from '#/config';

import { defineStore } from 'pinia';
import { store } from '@/stores';

import { LOCALE_KEY } from '@/enums/cacheEnum';
import { createLocalStorage } from '@/utils/cache';
import { localeSetting } from '@/settings/localeSetting';

const ls = createLocalStorage();

const lsLocaleSetting = (ls.get(LOCALE_KEY) || localeSetting) as LocaleSetting;

interface LocaleState {
  localInfo: LocaleSetting;
}

export const useLocaleStore = defineStore('app-locale', {
  state: (): LocaleState => ({
    localInfo: lsLocaleSetting,
  }),
  getters: {
    getShowPicker(): boolean {
      return !!this.localInfo?.showPicker;
    },
    getLocale(): LocaleType {
      return this.localInfo?.locale ?? 'zh_CN';
    },
  },
  actions: {
    /**
     * 设置多语言信息并缓存（localStorage）
     * Set up multilingual information and cache
     * @param info multilingual info
     */
    setLocaleInfo(info: Partial<LocaleSetting>) {
      this.localInfo = { ...this.localInfo, ...info };
      ls.set(LOCALE_KEY, this.localInfo);
    },
    /**
     * 初始化多语言信息并加载缓存的本地语言信息
     * Initialize multilingual information and load the existing configuration from the local cache
     */
    initLocale() {
      // todo：设置 dayjs 国际化
      // const dayjsLocale = this.getLocale.replace('_', '-').toLocaleLowerCase();

      this.setLocaleInfo({
        ...localeSetting,
        ...this.localInfo,
      });
    },
  },
});

// Need to be used outside the setup（todo..）
export function useLocaleStoreWithOut() {
  return useLocaleStore(store);
}

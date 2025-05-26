import type { SysConfigInfo } from './store.d.ts';

import { MenuTypeEnum, MenuModeEnum, TriggerEnum, MixSidebarTriggerEnum } from '@/enums/menuEnum';
import { ContentEnum, ThemeEnum, RouterTransitionEnum, SettingButtonPositionEnum, SessionTimeoutProcessingEnum } from '@/enums/appEnum';
import { CacheTypeEnum } from '@/enums/cacheEnum';

export type LocaleType = 'zh_CN' | 'zh_TW' | 'en_US' | 'ru' | 'ja' | 'ko';

export interface MenuSetting {
  bgColor: string;
  fixed: boolean;
  collapsed: boolean;
  siderHidden: boolean;
  canDrag: boolean;
  show: boolean;
  hidden: boolean;
  split: boolean;
  menuWidth: number;
  mode: MenuModeEnum;
  type: MenuTypeEnum;
  theme: ThemeEnum;
  topMenuAlign: 'start' | 'center' | 'end';
  trigger: TriggerEnum;
  accordion: boolean;
  closeMixSidebarOnChange: boolean;
  collapsedShowTitle: boolean;
  mixSideTrigger: MixSidebarTriggerEnum;
  mixSideFixed: boolean;
}

export interface MultiTabsSetting {
  cache: boolean;
  show: boolean;
  showIcon: boolean;
  showQuick: boolean;
  canDrag: boolean;
  showRedo: boolean;
  showFold: boolean;
  showIcon: boolean;
}

export interface HeaderSetting {
  bgColor: string;
  fixed: boolean;
  show: boolean;
  theme: ThemeEnum;
  // Turn on full screen
  showFullScreen: boolean;
  // Whether to show the lock screen
  useLockPage: boolean;
  // Show document button
  showDoc: boolean;
  // Show message center button
  showNotice: boolean;
  showSearch: boolean;
}

export interface LocaleSetting {
  showPicker: boolean;
  // Current language
  locale: LocaleType;
  // default language
  fallback: LocaleType;
  // available Locales
  availableLocales: LocaleType[];
}

export interface TransitionSetting {
  //  Whether to open the page switching animation
  enable: boolean;
  // Route basic switching animation
  basicTransition: RouterTransitionEnum;
  // Whether to open page switching loading
  openPageLoading: boolean;
  // Whether to open the top progress bar
  openNProgress: boolean;
}

export interface ProjectConfig {
  // Storage location of permission related information
  permissionCacheType: CacheTypeEnum;
  // Whether to show the configuration button
  showSettingButton: boolean;
  // Whether to show the theme switch button
  showDarkModeToggle: boolean;
  // Configure where the button is displayed
  settingButtonPosition: SettingButtonPositionEnum;
  // Session timeout processing
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum;
  // Website gray mode, open for possible mourning dates
  grayMode: boolean;
  // Whether to turn on the color weak mode
  colorWeak: boolean;
  // Theme color
  themeColor: string;
  // 系统背景
  sysBg: string;

  // The main interface is displayed in full screen, the menu is not displayed, and the top
  fullContent: boolean;
  // content width
  contentMode: ContentEnum;
  // Whether to display the logo
  showLogo: boolean;
  // Whether to show the global footer
  showFooter: boolean;
  // menuType: MenuTypeEnum;
  headerSetting: HeaderSetting;
  // menuSetting
  menuSetting: MenuSetting;
  // Multi-tab settings
  multiTabsSetting: MultiTabsSetting;
  // Animation configuration
  transitionSetting: TransitionSetting;
  // 页面布局是否启用keep-alive - pageLayout whether to enable keep-alive
  openKeepAlive: boolean;
  // 锁屏时间（单位：秒) - Lock screen time
  lockTime: number;
  // 显示面包屑导航 - Show breadcrumbs
  showBreadCrumb: boolean;
  // 显示面包屑图标 - Show breadcrumb icon
  showBreadCrumbIcon: boolean;
  // 使用错误处理插件 - Use error-handler-plugin
  useErrorHandle: boolean;
  // 是否开启返回顶部功能 - Whether to open back to top
  useOpenBackTop: boolean;
  // 是否允许嵌入iframe页面 - Is it possible to embed iframe pages
  canEmbedIFramePage: boolean;
  // 切换界面时是否删除未关闭的消息提示 - Whether to delete unclosed messages and notify when switching the interface
  closeMessageOnSwitch: boolean;
  // 切换界面时是否取消所有未响应的http请求 - Whether to cancel the http request that has been sent but not responded when switching the interface.
  removeAllHttpPending: boolean;
  sysConfigInfo: SysConfigInfo;
  globalBorderRadius: number;
}

export interface GlobConfig {
  // Site title
  title: string;
  // Service interface url
  apiUrl: string;
  // Report Service interface url
  reportApiUrl: string;
  // Upload url
  uploadUrl?: string;
  //  Service interface url prefix
  urlPrefix?: string;
  // Project abbreviation
  shortName: string;
  webSocketUrl: string;
  cipherKey: string;
  aMapJsKey: string;
  aMapWebKey: string;
  aMapSecurityJsCode: string;
  filePreviewServer: string;
  dataVUrl: string;
  reportServer: string;
  report: string;
}
export interface GlobEnvConfig {
  // 网站标题 - Site title
  VITE_GLOB_APP_TITLE: string;
  // 接口地址 - Service interface url
  VITE_GLOB_API_URL: string;
  // // Report Service interface url
  // VITE_GLOB_REPORT_API_URL: string;
  // 接口地址前缀 - Service interface url prefix
  VITE_GLOB_API_URL_PREFIX?: string;
  // 简称 - Project abbreviation
  VITE_GLOB_APP_SHORT_NAME: string;
  VITE_GLOB_WEBSOCKET_URL: string;
}

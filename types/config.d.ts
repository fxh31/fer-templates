export interface ProjectConfig {}

export interface GlobConfig {
  VITE_GLOB_API_URL: string;
}

export interface GlobEnvConfig {
  // 网站标题 - Site title
  VITE_GLOB_APP_TITLE: string;
  // 接口地址 - Service interface url
  VITE_GLOB_API_URL: string;
  // 接口地址前缀 Service interface url prefix
  VITE_GLOB_API_URL_PREFIX?: string;
  // -- Project abbreviation
  // 简称
  VITE_GLOB_APP_SHORT_NAME: string;
}

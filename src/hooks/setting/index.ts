import type { GlobConfig } from '#/config';

import { warn } from '@/utils/log';
import { getAppEnvConfig, isDevMode } from '@/utils/env';

export const useGlobSetting = (): Readonly<GlobConfig> => {
  const { VITE_GLOB_APP_TITLE, VITE_GLOB_API_URL, VITE_GLOB_REPORT_API_URL, VITE_GLOB_APP_SHORT_NAME, VITE_GLOB_API_URL_PREFIX, VITE_GLOB_WEBSOCKET_URL } =
    getAppEnvConfig();

  if (!/[a-zA-Z\_]*/.test(VITE_GLOB_APP_SHORT_NAME)) {
    warn(`VITE_GLOB_APP_SHORT_NAME Variables can only be characters/underscores, please modify in the environment variables and re-running.`);
  }

  const prodUrlPrefix = VITE_GLOB_API_URL && /https?:\/\//.test(VITE_GLOB_API_URL) ? VITE_GLOB_API_URL : window.location.origin + VITE_GLOB_API_URL;

  // Take global configuration
  const glob: Readonly<GlobConfig> = {
    apiUrl: VITE_GLOB_API_URL,
    urlPrefix: VITE_GLOB_API_URL_PREFIX,
  };
  return glob as Readonly<GlobConfig>;
};

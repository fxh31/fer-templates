import { isDevMode } from '@/utils/env';

// 缓存时间（秒）- System default cache time, in seconds
export const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 7; // 7 days

// aes 加密密钥 - aes encryption key
export const cacheCipher = {
  key: '_11111000001111@',
  iv: '@11111000001111_',
};

// 非开发模式使用 aes 加密系统缓存 - Whether the system cache is encrypted using aes
export const enableStorageEncryption = !isDevMode();

import type { CreateStorageParams } from './storageCache';

import { createStorage as create } from './storageCache';
import { getStorageShortName } from '@/utils/env';
import { enableStorageEncryption } from '@/settings/encryptionSetting';
import { DEFAULT_CACHE_TIME } from '@/settings/encryptionSetting';

export type Options = Partial<CreateStorageParams>;
const createOptions = (storage: Storage, options: Options = {}): Options => {
  return {
    hasEncrypt: enableStorageEncryption,
    storage,
    prefixKey: getStorageShortName(),
    ...options,
  };
};

export const Webstorage = create(createOptions(sessionStorage));

export const createStorage = (storage: Storage = sessionStorage, options: Options = {}) => {
  return create(createOptions(storage, options));
};

// sessionStorage
export const createSessionStorage = (options: Options = {}) => {
  return createStorage(sessionStorage, { ...options, timeout: DEFAULT_CACHE_TIME });
};
// localStorage
export const createLocalStorage = (options: Options = {}) => {
  return createStorage(localStorage, { ...options, timeout: DEFAULT_CACHE_TIME });
};

export default Webstorage;

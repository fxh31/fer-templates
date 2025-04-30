import type { EncryptionParams } from '@/utils/cipher';

import { cacheCipher } from '@/settings/encryptionSetting';
import { AesEncryption } from '@/utils/cipher';
import { isNullOrUnDef } from '@/utils/is';

export interface CreateStorageParams extends EncryptionParams {
  prefixKey: string;
  storage: Storage;
  hasEncrypt: boolean;
  timeout?: Nullable<number>;
}

export const createStorage = ({
  prefixKey = '',
  storage = sessionStorage,
  key = cacheCipher.key,
  iv = cacheCipher.iv,
  timeout = null,
  hasEncrypt = true,
}: Partial<CreateStorageParams> = {}) => {
  if (hasEncrypt && [key.length, iv.length].some(item => item !== 16)) {
    throw new Error('When hasEncrypt is true, the key or iv length must be 16 bits!');
  }

  const encryption = new AesEncryption({ key, iv });

  const webStorage = new WebStorage(storage, prefixKey, encryption, hasEncrypt, timeout);
  return webStorage;
};

// 封装 Storage
class WebStorage {
  private storage: Storage;
  private prefixKey?: string;
  private encryption: AesEncryption;
  private hasEncrypt: boolean;

  timeout?: Nullable<number>;

  constructor(storage, prefixKey: string, encryption: AesEncryption, hasEncrypt: boolean, timeout?: Nullable<number>) {
    this.storage = storage;
    this.prefixKey = prefixKey;
    this.encryption = encryption;
    this.hasEncrypt = hasEncrypt;
    this.timeout = timeout;
  }
  private getKey(key: string) {
    let appId = '';
    if (window.location.pathname?.startsWith('/Fer_APP_')) {
      const list = window.location.pathname.split('/');
      appId = list[1];
    }
    return `${this.prefixKey}${key}`.toUpperCase() + (appId ? `_${appId}` : '');
  }

  /**
   * 设置 Storage 缓存 - Set cache
   * @param {string} key
   * @param {*} value
   * @param {*} expire Expiration time in seconds
   * @memberof Cache
   */
  set(key: string, value: any, expire?: number | null = timeout) {
    const stringData = JSON.stringify({
      value,
      time: Date.now(),
      expire: !isNullOrUnDef(expire) ? new Date().getTime() + expire * 1000 : null,
    });
    // storage 里进行数据加密
    const stringifyValue = this.hasEncrypt ? this.encryption.encryptByAES(stringData) : stringData;
    this.storage.setItem(this.getKey(key), stringifyValue);
  }

  /**
   * 读取指定 Storage 数据 - Read cache
   * @param {string} key
   * @param {*} def
   * @memberof Cache
   */
  get(key: string, def: any = null): any {
    const val = this.storage.getItem(this.getKey(key));
    if (!val) return def;

    try {
      const decVal = this.hasEncrypt ? this.encryption.decryptByAES(val) : val;
      const data = JSON.parse(decVal);
      const { value, expire } = data;
      if (isNullOrUnDef(expire) || expire >= new Date().getTime()) {
        return value;
      }
      // 读取时发现过期了直接移除
      this.remove(key);
    } catch (e) {
      return def;
    }
  }

  /**
   * 删除指定 Storage 数据 - Delete cache based on key
   * @param {string} key
   * @memberof Cache
   */
  remove(key: string) {
    this.storage.removeItem(this.getKey(key));
  }

  /**
   * 清除所有 Storage 数据 - Delete all caches of this instance
   */
  clear(): void {
    this.storage.clear();
  }
}

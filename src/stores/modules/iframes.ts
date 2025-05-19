import { defineStore } from 'pinia';

interface IframeState {
  iframeKeepAlive: Map<string, string>; // iframe 缓存列表
  maxCache: number; // 最大缓存值
}

export const useIframeStore = defineStore('iframes', {
  state: (): IframeState => ({
    iframeKeepAlive: new Map(),
    maxCache: 1,
  }),
  getters: {
    iframeKeepAliveList(): any[] {
      return Array.from(this.iframeKeepAlive).map(([key, value]) => ({ key, url: value }));
    },
    getIframeKeepsAliveUrl() {
      return key => {
        if (!key) return null;
        const url = this.iframeKeepAlive.get(key);
        return url || null;
      };
    },
  },
  actions: {
    // 添加 iframe 缓存
    addIframeKeepsAlive({ key, url }) {
      const n = this.iframeKeepAlive.size;
      const delKey = this.iframeKeepAlive.keys().next().value;
      if (n >= this.maxCache) {
        this.iframeKeepAlive.delete(delKey);
      }
      this.iframeKeepAlive.set(key, url);
    },
    // 删除指定 iframe 缓存
    deleteIframeKeepsAlive(key: string) {
      this.iframeKeepAlive.delete(key);
    },
    /**
     * 结合 tab 标签使用
     */
    // 删除所有 iframe 缓存
    deleteAllIframeKeepsAlive() {
      this.iframeKeepAlive.clear();
    },
    // 删除其他 iframe 缓存
    deleteOtherIframeKeepsAlive(key: string) {
      let first = true;
      for (const [k, u] of this.iframeKeepAlive) {
        if (first) {
          first = false;
          continue;
        }
        if (k !== key) {
          this.deleteIframeKeepsAlive(k);
        }
      }
    },
    // 删除右边 iframe 缓存
    deleteRightIframeKeepsAlive(key) {
      let left = true;
      for (const [k, u] of this.iframeKeepAlive) {
        if (k !== key && left) {
          continue;
        }
        if (k === key) {
          left = false;
          continue;
        }
        this.deleteIframeKeepsAlive(k);
      }
    },
    // 删除左边 iframe 缓存
    deleteLeftIframeKeepsAlive(key) {
      let right = false,
        first = true;
      for (const [k, u] of this.iframeKeepAlive) {
        if (first) {
          first = false;
          continue;
        }
        if (right) return;
        if (k === key) {
          right = true;
          continue;
        }
        this.deleteIframeKeepsAlive(k);
      }
    },
  },
});

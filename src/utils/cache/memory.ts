export interface Cache<V = any> {
  value?: V;
  timeoutId?: ReturnType<typeof setTimeout>;
  time?: number; // 存活时间
  alive?: number; // 缓存存活时间
}

const NOT_ALIVE = 0;

export class Memory<T = any, V = any> {
  private cache: { [key in keyof T]?: Cache<T> } = {};
  private alive: number;
  constructor(private alive = 0) {
    this.alive = alive * 1000;
  }

  get getCache() {
    return this.cache;
  }

  setCache(cache) {
    this.cache = cache;
  }

  get<K extends keyof T>(key: K) {
    return this.cache[key];
  }

  set<K extends keyof T>(key: K, value: V, expires?: number) {
    let item = this.get(key);

    // 没有过期时间则走缓存时间（默认 alive = 0）
    if (!expires || (expires as number) <= 0) {
      expires = this.alive;
    }

    if (item) {
      if (item.timeoutId) {
        clearTimeout(item.timeoutId); // 清除定时器
        item.timeoutId = undefined;
      }
      item.value = value;
    } else {
      item = { value, alive: expires };
      this.cache[key] = item;
    }

    // 没有过期时间则直接返回值 {alive: 0}
    if (!expires) {
      return value;
    }

    const now = new Date().getTime();
    // 绝对时间戳：直接赋值；相对时间戳：当前时间戳 + 相对时间戳
    item.time = expires > now ? expires : now + expires;
    item.timeoutId = setTimeout(
      () => {
        this.remove(key);
      },
      expires > now ? expires - now : expires,
    );
    return value;
  }

  remove<K extends keyof T>(key: K) {
    const item = this.get(key); //  用于获取 timeoutId 清除定时器
    Reflect.deleteProperty(this.cache, key);
    if (item) {
      clearTimeout(item.timeoutId!);
      return item.value;
    }
  }

  resetCache(cache: { [K in keyof T]: Cache }) {
    Object.keys(cache).forEach(key => {
      const k = key as any as keyof T;
      const item = cache[k];
      if (item && item.time) {
        const now = new Date().getTime();
        const expire = item.time;
        if (expire > now) {
          this.set(k, item.value, expire);
        }
      }
    });
  }

  clear() {
    Object.keys(this.cache).forEach(key => {
      const item = this.cache[key];
      item.timeoutId && clearTimeout(item.timeoutId);
    });
    this.cache = {};
  }
}

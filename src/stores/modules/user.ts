import { defineStore } from 'pinia';

export const useUserStore = defineStore({
  id: 'app-user',
  state: () => ({
    backRouterList: [],
  }),
  getters: {
    getBackRouterList(): string[] {
      return this.backRouterList;
    },
  },
  actions: {},
});

// Need to be used outside the setup（todo..）
export function useUserStoreWithOut() {
  return useUserStore(store);
}

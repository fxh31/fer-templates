import type { UserInfo, PermissionInfo } from '#/store';
import type { BackMenu } from '@/api/basic/model/userModel';

import { PERMISSIONS_KEY, TOKEN_KEY, USER_INFO_KEY } from '@/enums/cacheEnum';

import { defineStore } from 'pinia';
import { getAuthCache, setAuthCache } from '@/utils/auth';

interface UserState {
  userInfo: Nullable<UserInfo>;
  token?: string;
  permissionList: PermissionInfo[];
  backMenuList: BackMenu[];
  backRouterList: BackMenu[];
  sessionTimeout?: boolean;
  lastUpdateTime: number;
}

export const useUserStore = defineStore('app-user', {
  state: (): UserState => ({
    permissionList: [],
    backRouterList: [],
  }),
  getters: {
    getPermissionList(): PermissionInfo[] {
      return this.permissionList.length ? this.permissionList : getAuthCache<PermissionInfo[]>(PERMISSIONS_KEY);
    },
    getBackRouterList(): string[] {
      return this.backRouterList;
    },
  },
  actions: {
    setPermissionList(permissionList: PermissionInfo[]) {
      this.permissionList = permissionList;
      setAuthCache(PERMISSIONS_KEY, permissionList);
    },
    setBackMenuList(backMenuList: BackMenu[]) {
      this.backMenuList = backMenuList;
    },
  },
});

// Need to be used outside the setup（todo..）
export function useUserStoreWithOut() {
  return useUserStore(store);
}

import type { ProjectConfig } from '#/config';
import { SessionTimeoutProcessingEnum } from '@/enums/appEnum';

const setting: ProjectConfig = {
  // 会话超时处理方案
  // ROUTE_JUMP: 路由跳转到登录页
  // PAGE_COVERAGE: 生成登录弹窗，覆盖当前页面
  sessionTimeoutProcessing: SessionTimeoutProcessingEnum.ROUTE_JUMP
};

export default setting;

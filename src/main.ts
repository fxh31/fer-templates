import './assets/main.css';

import { createApp } from 'vue';
import App from './App.vue';
import { initAppConfigStore } from '@/logics/initAppConfig';
import { router, setupRouter } from '@/router';
import { setupRouterGuard } from '@/router/guard';
import { setupStore } from '@/stores';
import { registerGlobComp } from '@/components/registerGlobComp';
async function bootstrap() {
  const app = createApp(App);

  // Configure store
  // 配置 store
  setupStore(app);

  // Initialize internal system configuration
  // 初始化内部系统配置
  initAppConfigStore();

  // Register global components
  // 注册全局组件
  registerGlobComp(app);

  // Configure routing
  // 配置路由
  setupRouter(app);

  // Router Guard
  // 路由守卫
  setupRouterGuard(router);

  app.mount('#app');
}

bootstrap();

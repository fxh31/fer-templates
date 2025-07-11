import './assets/main.css';
// import '@/design/index.less';
import '@/design/windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';

import { createApp } from 'vue';
import App from './App.vue';
import { initAppConfigStore } from '@/logics/initAppConfig';
import { setupErrorHandle } from '@/logics/error-handle';
import { router, setupRouter } from '@/router';
import { setupRouterGuard } from '@/router/guard';
import { setupStore } from '@/stores';
import { setupI18n } from '@/locales/setupI18n';
import { setupGlobDirectives } from '@/directives';
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

  // Multilingual configuration
  // 多语言配置
  // Asynchronous case: language files may be obtained from the server side
  // 异步案例：语言文件可能从服务器端获取
  await setupI18n(app);

  // Configure routing
  // 配置路由
  setupRouter(app);

  // Router Guard
  // 路由守卫
  setupRouterGuard(router);

  // Register global directive
  // 注册全局指令
  setupGlobDirectives(app);

  // Configure global error handling
  // 配置全局错误处理
  setupErrorHandle(app);

  app.mount('#app');
}

bootstrap();

import './assets/main.css';

import { createApp } from 'vue';

import App from './App.vue';
import { router, setupRouter } from '@/router';
import { setupStore } from '@/stores';
// import { registerGlobComp } from '@/components/registerGlobComp';
async function bootstrap() {
  const app = createApp(App);

  // Configure store
  // 配置 store
  setupStore(app);

  // Configure routing
  // 配置路由
  setupRouter(app);

  app.mount('#app');
}

bootstrap();

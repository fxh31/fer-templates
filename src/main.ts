import './assets/main.css';

import { createApp } from 'vue';
import { createPinia } from 'pinia';

import App from './App.vue';
import { router, setupRouter } from '@/router';
// import { registerGlobComp } from '@/components/registerGlobComp';
async function bootstrap() {
  const app = createApp(App);

  app.use(createPinia());

  // Configure routing
  // 配置路由
  setupRouter(app);

  app.mount('#app');
}

bootstrap();

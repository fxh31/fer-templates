<template>
  <div>
    <div>{{ count }}</div>
    <a-button @click="count++">+</a-button>
    <div class="iframe-container" v-for="(frame, key) in iframeState.list" :key="frame.key">
      <iframe ref="iframeRef" v-show="route.query.id === frame.key" :src="frame.url" @load="handleIframeLoad"></iframe>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { ref, watch, onActivated, onDeactivated, reactive, nextTick } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useIframeStore } from '@/stores/modules/iframes';
  const iframeStore = useIframeStore();
  const { iframeKeepAliveList, getIframeKeepsAliveUrl, addIframeKeepsAlive } = iframeStore;

  const iframeState = reactive({
    list: iframeStore.iframeKeepAliveList,
    defaulKey: '',
    test: '',
  });

  const count = ref(0);
  const isShow = ref(false);
  const route = useRoute();
  const router = useRouter();
  const iframeRef = ref(null);

  const addRoute = async id => {
    if (!getIframeKeepsAliveUrl(id)) {
      const res = { key: id, url: router.currentRoute.value.meta.url };
      iframeState.list.push(res);
      addIframeKeepsAlive(res);
    }
  };

  // 从路由参数中获取 URL
  const updateUrl = () => {
    iframeState.defaultKey = route.query.id;
    console.log(route.query.id);
    if (!route.query.id) return;
    addRoute(route.query.id);
  };

  // 监听路由变化
  watch(() => route.meta.url, updateUrl, { immediate: true });

  // 处理 iframe 加载完成事件（可选）
  const handleIframeLoad = () => {
    console.log('Iframe loaded:');
  };
</script>

<style scoped>
  .iframe-container {
    /* width: 100%;
    height: 100%; */
  }

  .iframe-container iframe {
    /* width: 100%;
    height: 100%; */
    width: 400px;
    height: 500px;
    border: none;
    position: fixed;
    top: 100px;
    left: 0;
  }
</style>

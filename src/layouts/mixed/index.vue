<!-- router-view 和 iframe 的混用保活模式 -->
<template>
  <div>
    <IframeWrapper v-show="$route.meta.iframe" />

    <RouterView v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" v-if="$route.meta.keepAlive" :key="$route.fullPath" />
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.keepAlive" :key="$route.fullPath" />
    </RouterView>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, unref } from 'vue';

  import IframeWrapper from '@/views/iframTest/IframeWrapper.vue';

  export default defineComponent({
    name: 'MixedLayout',
    components: { IframeWrapper },
    setup() {},
  });
</script>

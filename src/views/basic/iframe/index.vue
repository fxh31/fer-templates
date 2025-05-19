<template>
  <div v-loading="loading"> <iframe :src="frameSrc" :class="`${prefixCls}__main`" ref="frameRef" @load="hideLoading"></iframe> </div>
</template>

<script lang="ts" setup>
  import type { CSSProperties } from 'vue';

  import { ref, unref, computed, onMounted } from 'vue';
  import { useWindowSizeFn } from '@/hooks/event/useWindowSizeFn';
  import { useDesign } from '@/hooks/web/useDesign';

  defineProps({
    frameSrc: {
      type: String,
      default: 'http://localhost:5174',
    },
  });

  const { prefixCls } = useDesign('iframe-page');
  const heightRef = ref(window.innerHeight);
  const loading = ref(true);
  const frameRef = ref<HTMLFrameElement>();
  console.log(heightRef.value);

  useWindowSizeFn(() => {
    console.log(window.innerHeight);
  });

  const getWrapStyle = computed((): CSSProperties => {
    return {
      height: `${unref(heightRef)}px`,
    };
  });
  function hideLoading() {
    loading.value = false;
  }
  onMounted(() => {
    debugger;
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-iframe-page';

  .@{prefix-cls} {
    border-radius: 8px;
    overflow: hidden;
    .ant-spin-nested-loading {
      position: relative;
      height: 100%;

      .ant-spin-container {
        width: 100%;
        height: 100%;
        padding: 10px;
      }
    }

    &__mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }

    &__main {
      width: 100%;
      height: 100%;
      overflow: hidden;
      background-color: @component-background;
      border: 0;
      box-sizing: border-box;
    }
  }
</style>

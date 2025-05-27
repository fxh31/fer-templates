<script lang="ts">
  import { defineComponent, ref, toRefs } from 'vue';
  import { createAppProviderContext } from './useAppContext';
  import { createBreakpointListen } from '@/hooks/event/useBreakpoint';
  import { getSlot } from '@/utils/helper';
  import { prefixCls } from '@/settings/designSetting';

  const props = {
    prefixCls: { type: String, default: prefixCls }, // 样式公共前缀 - class style prefix
  };

  export default defineComponent({
    name: 'AppProvider',
    inheritAttrs: false,
    props,
    setup(props, { slots }) {
      const isMobile = ref(false);

      // Monitor screen breakpoint information changes
      createBreakpointListen(({ screenMap, sizeEnum, width }) => {
        const lgWidth = screenMap.get(sizeEnum.LG);
        if (lgWidth) {
          isMobile.value = width.value - 1 < lgWidth;
        }
        handleRestoreState();
      });

      const { prefixCls } = toRefs(props);
      // Inject variables into the global
      createAppProviderContext({ prefixCls, isMobile });

      // Used to maintain the state before the window changes
      function handleRestoreState() {
        // todo: 进行一些菜单样式的变化
      }

      return () => getSlot(slots);
    },
  });
</script>

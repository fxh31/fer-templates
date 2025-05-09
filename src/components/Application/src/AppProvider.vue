<script lang="ts">
  import { defineComponent, ref, toRefs } from 'vue';
  import { createAppProviderContext } from './useAppContext';
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
      const { prefixCls } = toRefs(props);

      // Inject variables into the global
      createAppProviderContext({ prefixCls, isMobile });

      return () => getSlot(slots);
    },
  });
</script>

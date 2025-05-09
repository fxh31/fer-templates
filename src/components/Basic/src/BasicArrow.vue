<template>
  <span :class="getClass">
    <DownOutlined :style="getStyle" />
  </span>
</template>
<script lang="ts" setup>
  import { computed, unref, useAttrs } from 'vue';
  import { DownOutlined } from '@ant-design/icons-vue';
  import { useDesign } from '@/hooks/web/useDesign';

  const props = defineProps({
    expand: { type: Boolean }, // 箭头是否展开 - Arrow expand state
    up: { type: Boolean }, // 上 - Arrow up by default
    down: { type: Boolean }, // 下 - Arrow down by default
    inset: { type: Boolean }, // 取消行高 - Cancel padding/margin for inline
  });

  const attrs: any = useAttrs();
  const { prefixCls } = useDesign('basic-arrow');

  // get component class
  const getClass = computed(() => {
    const { expand, up, down, inset } = props;
    return [
      prefixCls,
      {
        [`${prefixCls}--active`]: expand,
        up,
        inset,
        down,
      },
    ];
  });
  // todo：icon style
  const getStyle = computed(() => unref(attrs)?.iconStyle || {});
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-basic-arrow';

  .@{prefix-cls} {
    display: inline-block;
    cursor: pointer;
    transform: rotate(0deg);
    transition: all 0.3s ease 0.1s;
    transform-origin: center center;

    &--active {
      transform: rotate(0deg);
    }

    &.inset {
      line-height: 0px;
    }

    &.up {
      transform: rotate(-180deg);
    }

    &.down {
      transform: rotate(0deg);
    }

    &.up.@{prefix-cls}--active {
      transform: rotate(0deg);
    }

    &.down.@{prefix-cls}--active {
      transform: rotate(-180deg);
    }
  }
</style>

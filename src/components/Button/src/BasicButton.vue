<template>
  <Button v-bind="getBindValue" :class="getButtonClass" @click="onClick">
    <!-- 具名插槽 -->
    <template #icon v-if="$slots.icon || preIcon">
      <slot name="icon">
        <i :class="[preIcon, 'button-preIcon']"></i>
      </slot>
    </template>
    <template #default="data">
      <slot v-bind="data || {}"></slot>
      <i :class="[postIcon, 'button-postIcon']" v-if="postIcon"></i>
    </template>
  </Button>
</template>

<script lang="ts" setup>
  import { Button } from 'ant-design-vue'; // 引入 Button，避免原生 button 样式被覆盖
  import { computed, unref, useAttrs } from 'vue';
  import { buttonProps } from './props';

  defineOptions({
    name: 'AButton', // 覆盖 ant 的 Button 组件
    inheritAttrs: false,
    extends: Button,
  });

  const props: any = defineProps(buttonProps);

  // get component class
  const getButtonClass = computed(() => {
    const { color, disabled, type } = props;
    return [
      {
        [`ant-btn-${color}`]: !!color,
        [`ant-btn-${type}`]: type && ['warning', 'error'].includes(type),
        [`is-disabled`]: disabled,
      },
    ];
  });

  // get inherit binding value
  const attrs = useAttrs();
  const getBindValue = computed(() => ({ ...unref(attrs), ...props, type: !props.type || ['warning', 'error'].includes(props.type) ? 'default' : props.type }));
</script>

<style lang="less" scoped>
  .ant-btn {
    .button-preIcon,
    .button-postIcon,
    i {
      font-size: 14px;
    }
    :deep(.button-preIcon + span),
    :deep(i + span) {
      margin-left: 5px;
    }
    .button-postIcon {
      margin-left: 5px;
    }
  }
</style>

<template>
  <Input :class="getClass" v-bind="getBindValue" v-model:value="innerValue" @change="onChange">
    <template #[item]="data" v-for="item in Object.keys($slots).filter(k => k !== 'addonAfter')"><slot :name="item" v-bind="data || {}"></slot></template>
    <template #prefix v-if="prefixIcon">
      <i :class="prefixIcon"></i>
    </template>
    <template #suffix v-if="suffixIcon">
      <i :class="suffixIcon"></i>
    </template>
    <template #addonAfter v-if="getShowLocalePicker">
      <i class="i18n-icon icon-ym icon-ym-header-language" @click.stop="openI18nModal" :title="i18nValue" />
    </template>
  </Input>
  <a-form-item-rest>
    <I18nModal v-model:value="i18nValue" ref="i18nModalRef" @change="onI18nValueChange" />
  </a-form-item-rest>
</template>

<script lang="ts" setup>
  import { Input } from 'ant-design-vue';
  import { computed, ref, unref, watch, useAttrs } from 'vue';
  import { i18nInputProps } from './props';
  import { useDesign } from '@/hooks/web/useDesign';
  import { useDebounceFn } from '@vueuse/core';
  import { omit } from 'lodash-es';
  import I18nModal from './I18nModal.vue';
  import { useLocale } from '@/locales/useLocale';

  defineOptions({ name: 'FerI18nInput', inheritAttrs: false });
  const props = defineProps(i18nInputProps);
  const emit = defineEmits(['update:value', 'change', 'update:i18n', 'i18nChange']);
  const attrs: any = useAttrs({ excludeDefaultKeys: false });
  const innerValue = ref('');
  const i18nValue = ref('');
  const i18nModalRef = ref(null);
  const { prefixCls } = useDesign('i18n-input');
  const { getShowLocalePicker } = useLocale();
  const debounceOnChange = useDebounceFn(value => {
    emit('change', value);
  }, 200);

  const getBindValue = computed(() => ({ ...omit(unref(attrs), ['addonAfter']) }));
  const getClass = computed(() => [
    prefixCls,
    {
      [`${prefixCls}--active`]: !!unref(i18nValue),
    },
  ]);

  watch(
    () => props.value,
    val => {
      setValue(val);
    },
    { immediate: true },
  );
  watch(
    () => props.i18n,
    val => {
      setI18nValue(val);
    },
    { immediate: true },
  );

  function setValue(value) {
    innerValue.value = value;
  }
  function setI18nValue(value) {
    i18nValue.value = value;
  }
  function onChange(e) {
    emit('update:value', e.target.value);
    debounceOnChange(e.target.value);
  }
  function onI18nValueChange(val, data) {
    emit('update:i18n', val);
    emit('i18nChange', val, data);
  }
  function openI18nModal() {
    if (Reflect.has(unref(attrs), 'disabled') && unref(attrs).disabled) return;
    const i18nModal = unref(i18nModalRef) as any;
    i18nModal?.openModal();
  }
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-i18n-input';

  .@{prefix-cls} {
    .ant-input-prefix,
    .ant-input-suffix,
    :deep(.ant-input-prefix),
    :deep(.ant-input-suffix) {
      i {
        line-height: 20px;
        color: @text-color-help-dark;
      }
    }
    .i18n-icon {
      font-size: 18px;
      cursor: pointer;
      padding: 0 11px;
      &:hover {
        color: @primary-color;
      }
    }
    .ant-input-group-addon {
      flex-shrink: 0;
      padding: 0;
      &.ant-input-group-addon-disabled {
        cursor: not-allowed;
        .i18n-icon {
          cursor: not-allowed;
          &:hover {
            color: unset;
          }
        }
      }
    }
    &--active {
      .ant-input-affix-wrapper + .ant-input-group-addon,
      .ant-input + .ant-input-group-addon {
        background: @primary-color;
        color: #fff;
        .i18n-icon:hover {
          color: #fff;
        }
      }
    }
  }
</style>

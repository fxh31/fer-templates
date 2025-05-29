<template>
  <a-modal v-model:open="visible" title="Cron表达式" :width="800" class="fer-cron-modal" @ok="handleSubmit" @cancel="handleCancel" :maskClosable="false">
    <template #closeIcon>
      <ModalClose :canFullscreen="false" @cancel="handleCancel" />
    </template>
    <EasyCron v-bind="attrs" />
  </a-modal>
</template>

<script lang="ts" setup>
  import { ref, useAttrs } from 'vue';
  import { Modal as AModal } from 'ant-design-vue';
  import ModalClose from '@/components/Modal/src/components/ModalClose.vue';
  import EasyCron from './EasyCronInner.vue';

  defineOptions({ name: 'EasyCronModal', inheritAttrs: false });
  defineExpose({ openModal });
  const emit = defineEmits(['ok']);
  const attrs = useAttrs();
  const visible = ref(false);

  function openModal() {
    visible.value = true;
  }
  function handleCancel() {
    visible.value = false;
  }
  function handleSubmit() {
    handleCancel();
    emit('ok');
  }
</script>

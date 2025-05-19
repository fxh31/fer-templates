<template>
  <BasicModal v-bind="$attrs" title="测试">
    <div> basical modal test </div>
    <div> basical modal test </div>
    <div> basical modal test </div>
    <div> basical modal test </div>
    <div> basical modal test </div>
    <div> basical modal test </div>
    <div> basical modal test </div>
    <div> basical modal test </div>
    <div> basical modal test </div>
    <div> basical modal test </div>
    <div> basical modal test </div>
    <div> basical modal test </div>
    <div> basical modal test </div>
    <div> basical modal test </div>
    <div> basical modal test </div>
    <div> basical modal test </div>
    <div> basical modal test </div>
    <div> basical modal test </div>
    <div> basical modal test </div>
    <div> basical modal test </div>
    <div> basical modal test </div>
    <div> basical modal test </div>
    <div> basical modal test </div>
    <div> basical modal test </div>
    <div> basical modal test </div>
    <div> basical modal test </div>
    <div> basical modal test </div>
  </BasicModal>
  <!-- <a-button @click="openModalInner">inner 点击打开弹窗</a-button> -->
</template>
<script lang="ts" setup>
  import { ref, onMounted, useAttrs, defineComponent } from 'vue';
  import { BasicModal, useModalInner, useModal } from '@/components/Modal';

  const attrs = useAttrs();
  // const emits = defineEmits(['register']);
  console.log(attrs);

  // const [registerModal, { closeModal, setModalProps }] = useModalInner(init);
  // function registerModal() {
  //   console.log('rr');
  // }
  // const [registerTest, { openModal }] = useModal();

  // function init(data) {
  //   console.log('init', data);
  // }

  // function init(data) {
  //   console.log('init', data);
  // }
  // // function openModalInner() {
  // //   setModalProps({
  // //     open: true,
  // //   });
  // // }

  // const attr = useAttrs();
  // console.log('attr', attr);
</script>

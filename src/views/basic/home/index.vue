<template>
  <main
    >Home
    <a-button @click="openModalTest">点击打开弹窗</a-button>

    <ModalTest @register="registerTest" title="ttt" v-bind="componentPros" />
  </main>
</template>
<script setup lang="ts">
  import { onMounted, getCurrentInstance } from 'vue';
  import ModalTest from './component/modalTest.vue';
  import { testGet } from '@/api/basic/user';
  // import BasicTitle from '@/components/Basic/src/BasicTitle.vue';
  import { useModal } from '@/components/Modal';

  import { useRouter } from 'vue-router';

  const router = useRouter();
  const [registerTest, { openModal }] = useModal();

  function openModalTest() {
    openModal(true, {
      title: '测试',
      text: '666',
    });
  }

  function renderView() {
    testGet().then(res => {
      console.log(res);
    });
  }

  const componentPros = {
    // closable: false,
    // defaultFullscreen: true,
    // canFullscreen: false,
    // wrapperFooterOffset: 600,
    helpMessage: '测试',
    maskClosable: true,
    draggable: true,
    useWrapper: false,
    // bodyStyle: {
    //   height: '500px',
    // },
    // wrapClassName: 'testClss',
    // loadingTip: '加载中...',
    // loading: true,
    // showContinueBtn: true,
    // wrapperProps: { heigth: 800, minHeight: 300, useWrapper: false },
  };

  onMounted(() => {
    // router.push({
    //   path: '/home/iframe1/1',
    // });
    // renderView();
  });
</script>
<style>
  .testClss {
    height: 700px;
  }
</style>

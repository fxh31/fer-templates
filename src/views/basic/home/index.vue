<template>
  <main>
    <!-- <BasicModal @register="registerModal" defaultFullscreen>
      <BasicForm @register="registerForm" v-loading>
        <template #formFooter> footer </template>
      </BasicForm>
      <a-button @click="handleFormClick">changge</a-button>
    </BasicModal> -->
    <!-- <CronModal ref="cronModal"> </CronModal>
    <FerCron v-model:value="stateCron.value"> </FerCron> -->
    <!-- <FerAlert title="测试" type="warning" /> -->

    <!-- <BasicTree :treeData="treeData" defaultExpandAll title="88" search /> -->
    <!-- <BasicLeftTree :treeData="treeData" defaultExpandAll title="88sss" search /> -->

    <!-- <div v-click-outside="handleClickOutside" style="width: 100px; height: 100px; background-color: yellowgreen" :value="testValue">{{ testValue }}</div> -->
    <!-- <div style="width: 100px; height: 100px; background-color: yellow" :value="testValue">{{ testValue }}</div> -->
    <!-- <span class="bpmn ad-hoc-marke"></span> -->
    <QrTest />
  </main>
</template>
<script setup lang="ts">
  import { onMounted, reactive, ref } from 'vue';
  import { testGet } from '@/api/basic/user';
  import { BasicModal, useModal } from '@/components/Modal';
  import { BasicCaption } from '@/components/Basic';
  import { BasicTable, TableAction, useTable } from '@/components/Table';
  import { BasicForm, useForm } from '@/components/Form';
  import { IconPicker } from '@/components/Icon';

  import { BasicTree, BasicLeftTree } from '@/components/Tree';

  import { CronInner, CronModal, FerCron } from '@/components/Fer/Cron';
  import BasicDemo from '@/components/Form/demo/BasicFormAndTable.vue';
  import QrTest from '@/components/Qrcode/demo/Qrcode.vue';

  import { FerAlert } from '@/components/Fer/Alert';
  import { promoteRouteLevel } from '@/router/helper/routeHelper';
  import { dataURLtoBlob, urlToBase64 } from '@/utils/file/base64Convert';

  function renderView() {
    testGet().then(res => {
      console.log(res);
    });
  }

  const testValue = ref('');
  const testTable = ref('');
  const rules = {
    name: [
      { required: true, message: 'Please input Activity name', trigger: 'change' },
      { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' },
    ],
  };
  const treeData = ref([
    {
      id: 1,
      fullName: 'test',

      children: [
        {
          id: 2,
          fullName: 'test2',
        },
      ],
    },
    {
      id: 3,
      fullName: 'bob1',
    },
  ]);

  const formState = reactive({
    name: '',
    name2: '',
  });
  const stateCron = reactive({
    value: '',
  });
  const cronModal = ref(null);

  const initModal = data => {};

  const [registerModal, { setModalProps, closeModal, openModal }] = useModal(initModal);

  const handleFormClick = () => {
    updateSchema([{ field: 'changeNmae', label: '修改表单配置', component: 'Input', componentProps: { options: [] } }]);
    // setFieldsValue({
    //   name: 2,
    //   code: 666,
    //   description: 'details',
    // });
  };
  const handleClickOutside = () => {
    console.log('oute');
  };

  onMounted(() => {
    // openModal(true);
    // console.log(closeModal);
    // cronModal.value.openModal();
    // renderView();
  });
</script>

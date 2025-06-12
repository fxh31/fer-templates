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
    <BasicDemo />
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
  import BasicDemo from '@/components/Table/demo/BasicTable.vue';
  import BTest from '@/components/Table/demo/BTest.vue';

  import { FerAlert } from '@/components/Fer/Alert';
  import { promoteRouteLevel } from '@/router/helper/routeHelper';

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
  const formRef = ref();
  const onSubmit = () => {
    formRef.value
      .validate()
      .then(() => {
        console.log(99);
      })
      .catch(error => {
        console.log('error', error);
      });
  };
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
  const [registerForm, { setFieldsValue, validate, resetFields, updateSchema, setProps }] = useForm({
    labelWidth: 120,
    // baseColProps: { span: 6 },
    compact: true,
    // showActionButtonGroup: true,
    // showSubmitButton: true,
    // showAdvancedButton: true,
    schemas: [
      {
        field: 'name',
        label: '数据组名称',
        component: 'Input',
        // auth: '1,2',
        componentProps: { placeholder: '请输入' },
        rules: [{ required: true, trigger: 'blur', message: '必填' }],
      },
      {
        field: 'code',
        label: '数据组编号',
        component: 'Input',
        componentProps: { placeholder: '请输入' },
        rules: [{ required: true, trigger: 'blur', message: '必填' }],
      },
      // {
      //   component: 'Divider',
      //   // componentProps: { content: '' },
      // },
      {
        field: 'description',
        label: '描述',
        component: 'Textarea',
        componentProps: { placeholder: '请输入', row: 3 },
      },
      {
        field: 'description2',
        // label: '描述d',
        component: 'Checkbox',
        componentProps: {
          options: [
            { fullName: 'Apple', id: 'Apple' },
            { fullName: 'Pear', id: 'Pear' },
          ],
        },
      },
    ],
  });

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

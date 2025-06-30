<template>
  <a-button @click="getFormJson">获取表单数据</a-button>
  <FormGenerator ref="generatorRef" :conf="formData" :formInfo="dataForm" :dbType="dbType" />
</template>
<script lang="ts" setup>
  import { ref, reactive, toRefs, unref, nextTick, onMounted } from 'vue';
  import { useMessage } from '@/hooks/web/useMessage';
  import { BasicModal, useModal, useModalInner } from '@/components/Modal';
  import { FormGenerator } from '../index';

  interface State {
    activeStep: number;
    maxStep: number;
    loading: boolean;
    btnLoading: boolean;
    relationTable: boolean;
    mainTableFields: any[];
    dbOptions: any[];
    tables: any[];
    defaultTable: any[];
    dataForm: Recordable;
    isReload: boolean;
    [prop: string]: any;
  }

  interface ComType {
    getData: () => any;
  }

  const state = reactive<State>({
    activeStep: 0,
    maxStep: 2,
    loading: false,
    btnLoading: false,
    relationTable: false,
    mainTableFields: [],
    dbOptions: [],
    tables: [],
    defaultTable: [],
    dataForm: {
      id: '',
      fullName: '测试表单',
      enCode: '',
      type: 1,
      webType: 2,
      dbLinkId: '0',
      sortCode: 0,
      state: 1,
      category: '',
      description: '',
      tables: '',
      interfaceId: '',
      interfaceName: '',
      interfaceParam: '',
    },
    formData: null,
    columnData: null,
    appColumnData: null,
    dbType: 'MySQL',
    isReload: false,
  });
  const { activeStep, maxStep, loading, btnLoading, tables, mainTableFields, dbType, formData, columnData, appColumnData, dataForm } = toRefs(state);

  const { createMessage, createConfirm } = useMessage();

  const generatorRef = ref<Nullable<ComType>>(null);
  function getFormJson() {
    (unref(generatorRef) as ComType)
      .getData()
      .then(res => {
        createMessage.info('请前往控制台查看');
        console.log(res);
      })
      .catch(err => {
        createMessage.error(err.msg);
      });
  }
</script>

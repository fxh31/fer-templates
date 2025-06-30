<template>
  <BasicModal v-bind="$attrs" @register="registerModal" title="规则设置" @ok="handleSubmit" :minHeight="100">
    <a-form :colon="false" :labelCol="{ style: { width: '80px' } }" :model="dataForm" :rules="formRules" ref="formElRef">
      <p class="business-tip">选择需要设为业务主键的表单字段</p>
      <a-form-item label="联合字段" name="businessKeyList">
        <fer-select v-model:value="dataForm.businessKeyList" :options="options" multiple showSearch />
      </a-form-item>
      <a-form-item label="提示语" name="businessKeyTip">
        <fer-input v-model:value="dataForm.businessKeyTip" placeholder="请输入" />
      </a-form-item>
    </a-form>
  </BasicModal>
</template>
<script lang="ts" setup>
  import { reactive, ref, toRefs, nextTick } from 'vue';
  import { BasicModal, useModalInner } from '@/components/Modal';
  import type { FormInstance } from 'ant-design-vue';

  interface State {
    dataForm: any;
    formRules: any;
    options: any[];
  }

  const emit = defineEmits(['register', 'confirm']);
  const formElRef = ref<FormInstance>();
  const state = reactive<State>({
    dataForm: {
      businessKeyList: [],
      businessKeyTip: '',
    },
    formRules: {
      businessKeyList: [{ required: true, message: '必填', trigger: 'change', type: 'array' }],
      businessKeyTip: [{ required: true, message: '必填', trigger: 'change' }],
    },
    options: [],
  });
  const { dataForm, formRules, options } = toRefs(state);
  const [registerModal, { closeModal }] = useModalInner(init);
  const allowList = [
    'input',
    'textarea',
    'inputNumber',
    'radio',
    'checkbox',
    'select',
    'cascader',
    'treeSelect',
    'datePicker',
    'timePicker',
    'organizeSelect',
    'depSelect',
    'posSelect',
    'groupSelect',
    'roleSelect',
    'userSelect',
    'usersSelect',
    'areaSelect',
    'location',
  ];

  function init(data) {
    getOptions(data.drawingList || []);
    nextTick(() => {
      formElRef.value?.clearValidate();
      state.dataForm.businessKeyList = data.businessKeyList;
      state.dataForm.businessKeyTip = data.businessKeyTip;
    });
  }
  function getOptions(drawingList) {
    let list: any[] = [];
    const loop = (data, parent?) => {
      if (!data) return;
      if (data.__config__ && data.__config__?.ferKey !== 'table' && data.__config__.children && Array.isArray(data.__config__.children)) {
        loop(data.__config__.children, data);
      }
      if (Array.isArray(data)) data.forEach(d => loop(d, parent));
      if (data.__vModel__ && allowList.includes(data.__config__.ferKey)) {
        list.push({
          id: data.__vModel__,
          fullName: data.__config__.label,
        });
      }
    };
    loop(drawingList);
    list = list.filter(o => o.id.indexOf('_fer_') < 0);
    state.options = list;
  }
  async function handleSubmit() {
    try {
      const values = await formElRef.value?.validate();
      if (!values) return;
      emit('confirm', { ...state.dataForm });
      closeModal();
    } catch (_) {}
  }
</script>
<style lang="less">
  .business-tip {
    margin-bottom: 10px;
    padding: 0 4px;
    color: @text-color-label;
  }
</style>

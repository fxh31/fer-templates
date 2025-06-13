<template>
  <BasicForm @register="registerForm">
    <template #formHeader>
      <a-divider>footer</a-divider>
    </template>
    <template #submitBefore> <a-tag color="pink">按钮位置插槽</a-tag> </template>
    <template #advanceAfter> <a-tag color="blue">按钮位置插槽</a-tag> </template>
    <template #formFooter>
      <a-divider>footer</a-divider>
    </template>
  </BasicForm>
</template>
<script setup lang="ts">
  import { BasicForm, useForm } from '../';

  const [registerForm, { setFieldsValue, validate, resetFields, updateSchema, setProps }] = useForm({
    labelWidth: 120,
    layout: 'vertical',
    // baseColProps: { span: 6 },
    showActionButtonGroup: true, // 显示按钮组
    submitButtonOptions: {
      type: 'primary',
      text: '提交',
    },
    // showSubmitButton: false,
    showAdvancedButton: true, // 折叠表单
    alwaysShowLines: 3, // 不受折叠影响的行数
    // 按钮组列配置，提供媒体查询样式配置
    actionColOptions: {
      span: 24,
      offset: 0,
      xxl: {
        span: 6,
      },
    },
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
        field: 'fruits',
        label: '水果',
        component: 'Checkbox',
        componentProps: {
          options: [
            { fullName: 'Apple', id: 'Apple' },
            { fullName: 'Pear', id: 'Pear' },
          ],
        },
      },
    ],
    tableAction: [
      {
        label: '编辑',
        onClick: (record: Recordable) => {
          console.log(record);
        },
      },
      {
        label: '删除',
        color: 'error',
        popConfirm: {
          title: '是否确认删除',
          confirm: async () => {
            console.log('删除');
          },
        },
      },
    ],
  });
</script>

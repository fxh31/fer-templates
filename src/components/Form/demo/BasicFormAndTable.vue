<template>
  <div>
    <a-card>
      <BasicForm @register="registerForm" @submit="handleSubmit" :tableAction="tableAction"></BasicForm>
    </a-card>
    <BasicTable @register="registerTable"></BasicTable>
  </div>
</template>

<script setup lang="ts">
  import type { ColumnProps } from '@/components/Table/src/types/column';

  import { BasicTable, useTable } from '@/components/Table';
  import { BasicForm, useForm } from '../';

  // form
  const [registerForm, { setFieldsValue, validate, resetFields, updateSchema, setProps }] = useForm({
    labelWidth: 70,
    name: '基础表单',
    autoSubmitOnEnter: true, // 回车提交
    schemas: [
      {
        field: 'name',
        label: '姓名',
        component: 'Input',
        componentProps: { placeholder: '请输入' },
      },
      {
        field: 'age',
        label: '年龄',
        component: 'Input',
        // componentProps: { placeholder: '请输入' },
        componentProps: data => {
          // data: { schema, tableAction, formActionType, formModel }
          const dataList = getDataSource();
          let placeholder = '请输入';
          if (dataList.length > 0) {
            placeholder = `添加的数据将会在${dataList[0].name}后面`;
          }
          return { placeholder };
        },
      },
    ],
  });
  const tableAction = {
    getDataSource: () => {
      return getDataSource();
    },
  };

  // table
  const [registerTable, { reload, getDataSource, setTableData }] = useTable({
    dataSource: [
      {
        name: '张三',
        age: 18,
      },
    ],
    columns: [
      {
        title: '姓名',
        dataIndex: 'name',
        width: 100,
        align: 'center',
      },
      {
        title: '年龄',
        dataIndex: 'age',
        width: 100,
        align: 'center',
      },
    ],
  });
  // operations
  function handleSubmit() {
    validate().then(values => {
      const rest = getDataSource();
      const res = [...rest, values];

      setTableData(res);
    });
  }
</script>

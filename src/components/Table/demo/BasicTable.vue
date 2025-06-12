<template>
  <BasicTable @register="registerLoginTable" :columns="loginTableColumns" showTableSetting @fetchSuccess="handleFetchSuccess" @rowClick="handleRowClick">
    <!-- <template #headerCell="{ column }">
      <div>个性化单元格，原生属性</div>
    </template> -->
    <template #tableTitle>
      <a-button type="primary" preIcon="icon-ym icon-ym-btn-clearn" @click="handleReload">获取数据</a-button>
    </template>
    <template #bodyCell="{ column, record }">
      <!-- <template v-if="column.key === 'isCheck'">
        {{ record.isCheck }}
      </template> -->
      <template v-if="column.key === 'action'">
        <TableAction :actions="getTableActions(record)" />
      </template>
    </template>
    <!-- 配置子表 -->
    <template #expandedRowRender="{ record }">
      <BasicTable @register="registerUserTable" :data-source="record.userList">
        <template #bodyCell="{ column, record }"> </template>
      </BasicTable>
    </template>
  </BasicTable>
</template>

<script setup lang="ts">
  import type { BasicColumn } from '../index';
  import { BasicTable, useTable, TableAction } from '../index';

  const loginTableColumns = [
    { title: '类型', dataIndex: 'loginType', width: 100, edit: true },
    { title: '时间', dataIndex: 'creatorTime', width: 150, format: 'date|YYYY-MM-DD HH:mm:ss' },
    { title: '用户', dataIndex: 'userName', width: 120 },
    { title: '是否选择', dataIndex: 'isCheck', width: 120, edit: true, editComponent: 'Switch' },
    {
      title: '参数',
      dataIndex: 'count',
      width: 120,
      edit: true,
      editComponent: 'InputNumber',
    }, // Switch/Input/..ComponentType
    { title: 'IP地址', dataIndex: 'ipAddress', width: 120 },
    { title: '操作', dataIndex: 'action', width: 120 },
    {
      title: '小结序号加一',
      dataIndex: 'sumCount',
      // customRender: data => {
      //   return 4 + 1;
      // }, // tips：列的渲染会影响 summaryFunc 中的参数
    },
  ];
  async function getLogList() {
    return {
      code: 200,
      msh: '获取成功',
      data: [
        {
          loginType: '登录',
          creatorTime: '2022-01-01 12:00:00',
          userName: 'admin',
          ipAddress: '192.168.1.1',
          // isCheck: false, // tips：ant-design-vue 原生表格就渲染不出来 bool 类型的值
          count: 45,
          sumCount: 46,
          // children: [
          //   {
          //     loginType: '登录2',
          //     creatorTime: '2022-0221-01 12:00:00',
          //   },
          // ],
          userList: [
            {
              name: '张三',
              age: 12,
            },
          ],
        },
        {
          loginType: '登录',
          userName: 'user1',
          creatorTime: '2022-01-01 12:00:00',
          // isCheck: true,
          count: 6,
          sumCount: 47,
          userList: [],
        },
      ],
    };
  }

  const [registerLoginTable, { reload, getSelectRows }] = useTable({
    api: getLogList,
    // title: '登录日志',
    // dataSource: [
    //   {
    //     loginType: '登录6',
    //     creatorTime: '2022-01-01 12:00:00',
    //     userName: 'admin',
    //     ipAddress: '192.168.1.1',
    //   },
    //   {
    //     loginType: '登录',
    //     creatorTime: '2022-01-01 12:00:00',
    //   },
    // ], // 有 api 的使用使用 api
    rowSelection: { type: 'radio' }, // 单选/多选 checkbox
    // immediate: false,
    // clickToRowSelect: false,
    // clearSelectOnPageChange: true,
    showTableSetting: true,
    // isTreeTable: true,
    tableSetting: {
      size: false,
      expand: true,
      fullScreen: true,
    },
    // striped: true,
    useSearchForm: true,
    formConfig: {
      schemas: [
        {
          field: 'userName',
          label: '用户名',
          component: 'Input',
          componentProps: {
            placeholder: '请输入用户名',
            submitOnPressEnter: true,
          },
        },
      ],
    },
    showSummary: true,
    // summaryData: [{ _row: '总计', count: 600 }],
    summaryFunc: data => {
      const total = data.reduce((sum, item) => sum + item.count, 0);
      return [{ _row: '总计', count: total }]; // count 与 column 里的参数相对应
    },
  });
  const [registerUserTable] = useTable({
    // title: '登录日志',
    columns: [
      // { title: '', dataIndex: 'entrust', width: 38 },
      // { title: '序号', dataIndex: 'index', width: 50, align: 'center', customRender: ({ index }) => index + 1 },
      { title: '姓名', dataIndex: 'name', align: 'center' },
      { title: '年龄', dataIndex: 'age', align: 'center' },
      // { title: '', dataIndex: 'flow' },
    ],
    dataSource: [
      {
        name: '张三',
        age: 18,
      },
      {
        name: '李四',
        age: 25,
      },
    ], // 有 api 的使用使用 api
    // showHeader: false,
    showTableSetting: false,
    pagination: false,
    showIndexColumn: false, // 是否显示序号列
    // immediate: true,
  });
  const handleFetchSuccess = () => {
    console.log('fetch-success');
  };
  // const handleRowDbClick = record => {
  //   console.log('click double row', record);
  // };
  const handleRowClick = record => {
    console.log('click row');
  };
  const handleReload = record => {
    reload();
  };
  const getTableActions = (record, index) => {
    return [
      {
        label: '刷新',
        onClick: () => handleReload(record), // handleReload.bind(null, record.id, record)
      },
      {
        label: '修改',
        onConfirm: () => handleReload(record), // handleReload.bind(null, record.id, record)
      },
    ];
  };
</script>

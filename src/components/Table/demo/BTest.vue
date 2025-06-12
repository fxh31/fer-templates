<template>
  <div>
    <BasicTable :dataSource="dataSource" :columns="columns" :summaryFunc="summaryFunc" :summaryData="summaryData" :showSummary="true" />
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable } from '../';

  export default defineComponent({
    name: 'MyPage',
    components: { BasicTable },
    setup() {
      const dataSource = [
        { key: '1', name: 'John Brown', amount: 100 },
        { key: '2', name: 'Jim Green', amount: 200 },
        { key: '3', name: 'Joe Black', amount: 300 },
      ];

      const columns = [
        { title: 'Name', dataIndex: 'name' },
        { title: 'Amount', dataIndex: 'amount' },
      ];

      const summaryFunc = data => {
        const total = data.reduce((sum, item) => sum + item.amount, 0);
        return [{ key: 'total', name: 'Total', amount: total }];
      };

      const summaryData = [{ key: 'total', name: 'Total', amount: 600 }];

      return {
        dataSource,
        columns,
        summaryFunc,
        summaryData,
      };
    },
  });
</script>

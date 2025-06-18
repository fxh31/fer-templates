<template>
  <BasicLeftTree :treeData="treeData" defaultExpandAll title="88sss" search />
</template>
<script setup lang="ts">
  import { ref } from 'vue';
  import { BasicLeftTree } from '..';

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
</script>

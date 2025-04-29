<template>
  <main>Home</main>
</template>
<script setup lang="ts">
  import { onMounted } from 'vue';
  import { testGet } from '@/api/basic/user';
  function renderView() {
    testGet().then(res => {
      console.log(res);
    });
  }
  onMounted(() => {
    renderView();
  });
</script>

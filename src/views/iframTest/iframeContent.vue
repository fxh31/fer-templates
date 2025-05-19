<template>
  <div class="iframe2">
    <h1>countent{{ count }}</h1>
    <!-- <a-button type="primary" @click="handleRoute('/home/iframe1', 1)">iframe1</a-button>
    <a-button type="primary" @click="handleRoute('/home/iframe2', 2)">iframe2 content</a-button> -->
    <a-button type="primary" @click="count++">+</a-button>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  const router = useRouter();
  const count = ref(0);

  const handleRoute = (path, id) => {
    router.push(path + '?id=' + id);
  };
</script>
<style lang="less">
  .iframe2 {
    border: none;
    position: fixed;
    top: 120px;
    left: 0;
  }
</style>

<!-- views/IframePage.vue -->
<template>
  <div class="route1">
    route1 test
    {{ count }}
    <a-button @click="count++">+</a-button>
    <!-- <IframeWrapper /> -->
  </div>
</template>

<script setup>
  import { ref } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  const router = useRouter();
  const route = useRoute();
  const count = ref(0);
</script>
<style lang="less">
  .route1 {
    border: none;
    position: fixed;
    top: 120px;
    left: 0;
  }
</style>

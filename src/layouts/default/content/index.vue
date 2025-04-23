<template>
  <PageLayout />
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import PageLayout from '@/layouts/page/index.vue';

  export default defineComponent({
    name: 'LayoutContent',
    components: {
      PageLayout,
    },
    setup() {},
  });
</script>

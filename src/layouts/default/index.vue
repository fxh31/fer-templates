<template>
  <div><LayoutContent /></div>
</template>

<script lang="ts">
  import { defineComponent, computed, unref, onMounted } from 'vue';
  import LayoutContent from './content/index.vue';

  export default defineComponent({
    name: 'DefaultLayout',
    components: {
      LayoutContent,
    },
    setup() {},
  });
</script>

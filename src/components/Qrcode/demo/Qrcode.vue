<template>
  <QrCode v-bind="getBindValue" @done="loadDone" @error="handleError" />
</template>
<script lang="ts" setup>
  import { QrCode } from '../';

  const getBindValue = {
    value: 'https://www.ferhannah.cn/',
    options: {
      width: 200,
      color: {
        dark: '#000000',
        light: '#ffffff',
      },
    },
    width: 300,
    // logo: 'https://www.ferhannah.cn/static/img/logo.png',
    logo: {
      src: 'https://www.ferhannah.cn/static/img/logo.png',
      // crossOrigin: 'use-credentials',
    },
    tag: 'canvas',
  };
  function loadDone(res) {
    console.log(res);
  }
  function handleError(err) {
    console.log(err);
  }
</script>

<template>
  <div class="http404-container">
    <div class="http404">
      <img src="@/assets/images/404.png" alt="404" class="pic-404" />
      <div class="bullshit">
        <div class="bullshit__oops">OOPS!</div>
        <button type="primary" size="large" @click="$router.push('/home')">返回</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup></script>

<style lang="less" scoped>
  .http404-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .http404 {
    .pic-404 {
      position: relative;
      float: left;
      width: 500px;
      overflow: hidden;
      margin-right: 100px;
    }
    .bullshit {
      position: relative;
      float: left;
      width: 350px;
      padding: 90px 0;
      overflow: hidden;
      &__oops {
        font-size: 32px;
        font-weight: bold;
        line-height: 40px;
        opacity: 0;
        margin-bottom: 20px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-fill-mode: forwards;
        // color: @primary-color;
      }
      &__headline {
        font-size: 20px;
        line-height: 24px;
        font-weight: bold;
        opacity: 0;
        margin-bottom: 10px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.1s;
        animation-fill-mode: forwards;
      }
      &__info {
        font-size: 13px;
        line-height: 21px;
        color: grey;
        opacity: 0;
        margin-bottom: 40px;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.2s;
        animation-fill-mode: forwards;
      }
      &__return-home {
        float: left;
        animation-name: slideUp;
        animation-duration: 0.5s;
        animation-delay: 0.3s;
        animation-fill-mode: forwards;
      }
      @keyframes slideUp {
        0% {
          transform: translateY(60px);
          opacity: 0;
        }
        100% {
          transform: translateY(0);
          opacity: 1;
        }
      }
    }
  }
</style>

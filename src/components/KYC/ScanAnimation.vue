<template>
  <div class="scan-animation">
    <div class="inner">
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.scan-animation {
  background-image: url('@/assets/images/kyc-camera-border.svg');
  background-repeat: no-repeat;
  background-size: contain;
  width: 100%;
  height: 245px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 21px 24px;
  border-radius: 20px;
  box-shadow: 0 0 0 99999px #fff;
  
  > .inner {
    width: 100%;
    height: 100%;
    position: relative;

    img {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
  }
}
</style>

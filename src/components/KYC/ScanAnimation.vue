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
  background-size: 100% 100%;
  width: 100%;
  height: 200px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 21px 24px;

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

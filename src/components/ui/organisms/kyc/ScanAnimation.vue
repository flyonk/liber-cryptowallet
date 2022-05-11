<template>
  <div class="scan-animation">
    <div class="inner">
      <div class="decoration"></div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss">
.scan-animation {
  // FIXME: https://app.asana.com/0/1202027391732065/1202029229041328/f
  //background-image: url('@/assets/images/kyc-camera-border.svg');
  //background-repeat: no-repeat;
  //background-size: contain;
  //background-position: center;
  width: 100%;
  height: 245px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 21px 24px;
  border-radius: 12px;
  box-shadow: 0 0 0 99999px #fff;

  > .inner {
    width: 100%;
    height: 100%;
    position: relative;

    &::before,
    &::after,
    & > :first-child::before,
    & > :first-child::after {
      position: absolute;
      width: 26px;
      height: 26px;
      border-color: $color-yellow-500; /* or whatever colour */
      border-style: solid; /* or whatever style */
      content: ' ';
    }

    &::before {
      top: -4px;
      left: -4px;
      border-width: 4px 0 0 4px;
      border-top-left-radius: 16px;
    }

    &::after {
      top: -4px;
      right: -4px;
      border-width: 4px 4px 0 0;
      border-top-right-radius: 16px;
    }

    & > :first-child::before {
      bottom: -4px;
      right: -4px;
      border-width: 0 4px 4px 0;
      border-bottom-right-radius: 16px;
    }

    & > :first-child::after {
      bottom: -4px;
      left: -4px;
      border-width: 0 0 4px 4px;
      border-bottom-left-radius: 16px;
    }
  }

  > .inner > img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
}
</style>

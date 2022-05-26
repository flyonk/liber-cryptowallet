<template>
  <div class="main-loader">
    <img :src="`${STATIC_BASE_URL}/static/media/logomark.svg`" />
  </div>
</template>

<script setup lang="ts">
import { STATIC_BASE_URL } from '@/constants';
</script>

<style lang="scss" scoped>
.main-loader {
  height: 140px;
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 1;

  > .img {
    width: 140px;
    height: 140px;
  }
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.rotating {
  animation: rotating 1s linear infinite;
}
</style>

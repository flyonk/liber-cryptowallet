<template>
  <div class="welcome-screen">
    <main-page-loader v-if="loading" />
    <img
      v-else
      src="@/assets/images/liber-logo.png"
      alt="logo"
    >
  </div>
</template>

<script setup lang="ts">
import MainPageLoader from '@/components/UI/MainPageLoader.vue'
import { ref } from 'vue'

const loading = ref(true)

setTimeout(() => {
  loading.value = false
}, 3333);
</script>

<style lang="scss" scoped>
.welcome-screen {
  height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

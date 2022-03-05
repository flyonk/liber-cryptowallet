<template>
  <div
    class="welcome-screen"
    :style="stylePaddings"
  >
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
import useSafeAreaPaddings from '@/helpers/safeArea';
import router from '@/router';
import { onMounted, ref } from 'vue'
const { stylePaddings } = useSafeAreaPaddings()

const loading = ref(true)

onMounted(() => {
  setTimeout(() => {
    loading.value = false
    setTimeout(() => {
      router.push('/welcome-auth')
    }, 1000)
  }, 2000);
})
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

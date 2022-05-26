<template>
  <div class="welcome-screen" :style="stylePaddings">
    <main-page-loader v-if="loading" />
    <img v-else :src="`${STATIC_BASE_URL}/static/media/logo.png`" alt="logo" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import useSafeAreaPaddings from '@/helpers/safeArea';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { useAppOptionsStore } from '@/stores/appOptions';

import { STATIC_BASE_URL } from '@/constants';
import MainPageLoader from '@/components/ui/atoms/MainPageLoader.vue';

import { Route } from '@/router/types';

const { stylePaddings } = useSafeAreaPaddings();

const loading = ref(true);

const authStore = useAuthStore();
const appOptionsStore = useAppOptionsStore();
appOptionsStore.init();

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
    setTimeout(async () => {
      await authStore.recoverTokenData();

      if (authStore.isLoggedIn) {
        let route = Route.Login;
        !(await appOptionsStore.checkPassCode()) //TODO: check user status when backend is ready
          ? (route = Route.SignUp)
          : authStore.setStep(2, 'login');
        router.push({ name: route });
      } else {
        router.push('/welcome-auth');
      }
    }, 1000);
  }, 2000);
});
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

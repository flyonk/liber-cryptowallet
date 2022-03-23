<template>
  <div class="welcome-screen" :style="stylePaddings">
    <main-page-loader v-if="loading" />
    <img v-else src="@/assets/images/liber-logo.png" alt="logo" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import useSafeAreaPaddings from '@/helpers/safeArea';
import router from '@/router';
import { useAuthStore } from '@/stores/auth';
import { useProfileStore } from '@/stores/profile';

import MainPageLoader from '@/components/ui/atoms/MainPageLoader.vue';

import { Route } from '@/router/types';

const { stylePaddings } = useSafeAreaPaddings();

const loading = ref(true);

const authStore = useAuthStore();
const pStore = useProfileStore();

onMounted(() => {
  setTimeout(() => {
    loading.value = false;
    setTimeout(async () => {
      await authStore.setToken();

      if (authStore.isLoggedIn) {
        await pStore.init();
        //TODO: fix with backend user status
        pStore.getUser.status === 0 //Should be EUserStatus.unregistered
          ? router.push({ name: Route.SignUp })
          : authStore.setStep(2, 'login');

        router.push({ name: Route.Login });
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

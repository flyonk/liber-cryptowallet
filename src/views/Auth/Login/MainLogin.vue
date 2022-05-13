<template>
  <auth-page-switcher :components="components" scope="login" />
</template>

<script lang="ts" setup>
import { computed, onBeforeUnmount } from 'vue';

import { useAuthStore } from '@/stores/auth';

import AuthPageSwitcher from '@/components/ui/organisms/auth/AuthPageSwitcher.vue';
import { Login1Step, Login2Step, Login3Step } from '.';

const authStore = useAuthStore();

const components = computed(() => [Login1Step, Login2Step, Login3Step]);

onBeforeUnmount(() => {
  authStore.setStep(1, 'login');
});
</script>

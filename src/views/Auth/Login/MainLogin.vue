<template>
  <auth-page-switcher :components="components" scope="login" />
</template>

<script lang="ts" setup>
import AuthPageSwitcher from '@/components/ui/organisms/auth/AuthPageSwitcher.vue';
import { Login1Step, Login2Step, Login3Step } from '.';
import { computed } from 'vue-demi';

const components = computed(() => [Login1Step, Login2Step, Login3Step]);
</script>

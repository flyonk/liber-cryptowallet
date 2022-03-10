<template>
  <auth-page-switcher :components="components" scope="login" />
</template>

<script lang="ts" setup>
import AuthPageSwitcher from '@/components/Auth/AuthPageSwitcher.vue';
import { Login1Step, Login2Step, Login3Step, Login4Step } from '.';
import { computed } from 'vue-demi';

const components = computed(() => [
  Login1Step,
  Login2Step,
  Login3Step,
  Login4Step,
]);
</script>

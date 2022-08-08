<template>
  <router-view />
  <!-- todo: temporary disabled  -->
  <!-- <auth-page-switcher :components="components" scope="recover" /> -->
  <restore-contact-support />
</template>

<script lang="ts" setup>
import RestoreContactSupport from '@/views/Auth/Restore/RestoreContactSupport.vue';
// todo: temporary disabled
// import AuthPageSwitcher from '@/components/ui/organisms/auth/AuthPageSwitcher.vue';
// import {
//   Restore1Step,
//   Restore2Step,
//   Restore3Step,
//   Restore4Step,
//   Restore5Step,
// } from '.';

// import { computed } from 'vue-demi';

// const components = computed(() => [
//   Restore1Step,
//   Restore2Step,
//   Restore3Step,
//   Restore4Step,
//   Restore5Step,
// ]);
</script>

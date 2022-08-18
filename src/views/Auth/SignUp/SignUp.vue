<template>
  <auth-page-switcher :components="components" scope="registration" />
</template>

<script lang="ts" setup>
import { computed } from 'vue-demi';

import {
  SignUp1Step,
  SignUp2Step,
  SignUp3Step,
  SignUp4Step,
  SignUp5Step,
  SignUp6Step,
} from '@/views/Auth/SignUp/index';
import AuthPageSwitcher from '@/components/ui/organisms/auth/AuthPageSwitcher.vue';

const components = computed(() => [
  SignUp1Step,
  SignUp2Step,
  SignUp3Step,
  SignUp4Step,
  SignUp5Step,
  SignUp6Step,
]);
</script>

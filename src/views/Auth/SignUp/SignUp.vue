<template>
  <AuthPageSwitcher
    :components="components"
    scope="registration"
  />
</template>

<script lang="ts" setup>
import { computed } from 'vue-demi';

import { SignUp1Step, SignUp2Step } from '@/views/Auth/SignUp/index';
import AuthPageSwitcher from '@/components/Auth/AuthPageSwitcher.vue';

const components = computed(() => ([SignUp1Step, SignUp2Step]))

</script>


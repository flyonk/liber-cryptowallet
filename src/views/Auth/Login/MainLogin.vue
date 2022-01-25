<template>
  <auth-page-switcher
    :components="components"
    scope="login"
  />
</template>

<script lang="ts" setup>
import AuthPageSwitcher from '@/components/Auth/AuthPageSwitcher.vue';
import { Login1Step } from '.';

import { computed } from 'vue-demi';

const components = computed(() => ([Login1Step]))

</script>
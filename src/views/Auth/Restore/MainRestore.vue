<template>
  <auth-page-switcher
    :components="components"
    scope="login"
  />
</template>

<script lang="ts" setup>
import AuthPageSwitcher from '@/components/Auth/AuthPageSwitcher.vue';
import { Restore1Step, Restore2Step } from '.';

import { computed } from 'vue-demi';

const components = computed(() => ([ Restore1Step, Restore2Step ]))

</script>
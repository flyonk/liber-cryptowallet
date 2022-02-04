<template>
  <auth-page-switcher
    :components="components"
    scope="recover"
  />
</template>

<script lang="ts" setup>
import AuthPageSwitcher from '@/components/Auth/AuthPageSwitcher.vue';
import { Restore1Step, Restore2Step, Restore3Step, Restore4Step, Restore5Step } from '.';

import { computed } from 'vue-demi';

const components = computed(() => ([ Restore1Step, Restore2Step, Restore3Step, Restore4Step, Restore5Step ]))

</script>
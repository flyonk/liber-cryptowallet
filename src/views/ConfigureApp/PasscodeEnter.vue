<template>
  <passcode-enter :redirect-on-success-route="Route.DashboardHome" />
</template>

<script lang="ts" setup>
import PasscodeEnter from '@/components/ui/organisms/auth/PasscodeEnter.vue';

import { Route } from '@/router/types';
</script>

<style lang="scss" scoped>
// ...
</style>

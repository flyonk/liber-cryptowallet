<template>
  <t-top-navigation
    full-height
    left-icon-name="icon-app-navigation-close"
    @click:left-icon="$router.push({ name: Route.DashboardHome })"
  >
    <template #title> {{ coinCode.toUpperCase() }} Account</template>
    <template #content> <account-details :coin-code="coinCode" /></template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useAccountStore } from '@/applications/liber/stores/account';
import { Route } from '@/router/types';

import { AccountDetails, TTopNavigation } from '@/components/ui';

const accountStore = useAccountStore();

const coinCode = computed(() => accountStore.getNewAccountParams.coin);
</script>

<style scoped lang="scss">
:deep(.content) {
  height: 100%;

  @include iPhoneSE {
    max-height: 480px !important;
    overflow: scroll !important;
  }
}
</style>

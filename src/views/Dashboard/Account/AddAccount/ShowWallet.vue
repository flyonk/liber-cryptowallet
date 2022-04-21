<template>
  <top-navigation
    left-icon-name="icon-app-navigation-close"
    @click:left-icon="$router.push({ name: Route.DashboardHome })"
  >
    {{ coinCode.toUpperCase() }} Account
  </top-navigation>

  <account-details :coin-code="coinCode" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useAccountStore } from '@/stores/account';
import { Route } from '@/router/types';

import { AccountDetails, TopNavigation } from '@/components/ui';

const accountStore = useAccountStore();

const coinCode = computed(() => accountStore.getNewAccountParams.coin);
</script>

<style scoped></style>

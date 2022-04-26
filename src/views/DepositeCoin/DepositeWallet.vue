<template>
  <div class="page-wrapper">
    <top-navigation
      left-icon-name="icon-app-navigation-close"
      @click:left-icon="$router.push({ name: Route.DashboardHome })"
    >
      {{ $t('views.deposit.wallet.deposit') }} {{ coinCode.toUpperCase() }}
    </top-navigation>

    <account-details :coin-code="coinCode" />
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue';

import { Route } from '@/router/types';
import { useDepositStore } from '@/stores/deposit';

import { AccountDetails, TopNavigation } from '@/components/ui';

const depositStore = useDepositStore();

const coin = ref<string | null>(null);

onBeforeMount(async () => {
  coin.value = depositStore.getAccountInfo;
});

const coinCode = computed((): string => {
  return coin.value?.code || '';
});
</script>

<style lang="scss" scoped>
.page-wrapper {
  padding: 0 15px;
  flex-grow: 1;
  background-color: $color-light-grey-200;
  display: flex;
  flex-direction: column;
}
</style>

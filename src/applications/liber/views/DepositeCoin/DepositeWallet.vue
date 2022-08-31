<template>
  <div class="page-wrapper">
    <t-top-navigation
      left-icon-name="icon-app-navigation-close"
      @click:left-icon="$router.push({ name: Route.DashboardHome })"
    >
      <template #title>
        {{ $t('views.deposit.wallet.deposit') }}
        {{ coinCode.toUpperCase() }}</template
      >
      <template #content>
        <account-details :coin-code="coinCode" />
      </template>
    </t-top-navigation>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue';

import { Route } from '@/router/types';
import { useDepositStore } from '@/applications/liber/stores/deposit';

import { AccountDetails, TTopNavigation } from '@/components/ui';

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
  padding: 0;
  flex-grow: 1;
  background-color: $color-light-grey-200;
  display: flex;
  flex-direction: column;
}
</style>

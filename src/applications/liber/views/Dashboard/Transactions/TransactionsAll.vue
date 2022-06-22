<template>
  <t-top-navigation
    @click:left-icon="$router.push({ name: Route.DashboardHome })"
  >
    <template #title>{{ $t('views.dashboard.home.transactions') }}</template>
    <template #content>
      <transactions-list :transactions="transactions" class="transactions-list"
    /></template>
  </t-top-navigation>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { onMounted } from 'vue-demi';

import transactionService from '@/applications/liber/services/transactionService';

import { TransactionsList, TTopNavigation } from '@/components/ui';

import { INetTransaction } from '@/models/transaction/transaction';
import { Route } from '@/router/types';

const transactions: Ref<INetTransaction[]> = ref([]);

onMounted(async () => {
  transactions.value = await transactionService.getTransactionList();
});
</script>

<style lang="scss" scoped>
.transaction-all {
  padding: 10px;

  > .transactions-list {
    margin-top: 30px;
  }
}
</style>

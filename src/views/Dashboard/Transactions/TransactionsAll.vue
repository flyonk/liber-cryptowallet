<template>
  <div class="transaction-all">
    <top-navigation
      @click:left-icon="$router.push({ name: Route.DashboardHome })"
      >Transactions</top-navigation
    >
    <transactions-list :transactions="transactions" class="transactions-list" />
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue';
import { onMounted } from 'vue-demi';

import transactionService from '@/services/transactionService';

import { TopNavigation } from '@/components/ui';
import TransactionsList from '@/components/ui/organisms/transactions/TransactionsList.vue';

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

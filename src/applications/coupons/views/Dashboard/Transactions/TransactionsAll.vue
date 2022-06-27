<template>
  <t-top-navigation
    @click:left-icon="$router.push({ name: CouponRoutes.DashboardHome })"
  >
    <template #title>{{ $t('views.dashboard.home.transactions') }}</template>
    <template #content>
      <transactions-list
        :transactions="transactions"
        transaction-type="coupons"
        class="transactions-list"
    /></template>
  </t-top-navigation>
</template>

<script setup lang="ts">
import { computed, onBeforeMount } from 'vue';

import { TransactionsList, TTopNavigation } from '@/components/ui';

import { CouponRoutes } from '@/applications/coupons/router/types';
import { useCouponsStore } from '@/applications/coupons/stores/coupons';
import { useErrorsStore } from '@/stores/errors';

const couponsStore = useCouponsStore();
const errorsStore = useErrorsStore();
const transactions = computed(() => couponsStore.getTransactions);

onBeforeMount(async () => {
  try {
    await couponsStore.setTransactions();
  } catch (e) {
    await errorsStore.handle({
      err: e,
      name: 'TransactionsAll',
      ctx: 'onBeforeMount',
      description: 'Error receiving coupon data',
    });
  }
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

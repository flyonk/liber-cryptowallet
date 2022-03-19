<template name="TransactionsList">
  <ul class="transactions">
    <li
      v-for="({ icon, sum, info, status, code, type }, index) in transactions"
      :key="index"
      class="item"
      @click="$router.push('/transactions/details')"
    >
      <TransactionsListItem
        :icon="icon"
        :sum="sum"
        :info="info"
        :status="status"
        :code="code"
        :type="type"
      />
    </li>
  </ul>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

import { INetTransaction } from '@/models/transaction/transaction';

import TransactionsListItem from '@/components/ui/molecules/TransactionsListItem.vue';

defineProps({
  transactions: {
    type: Array as PropType<INetTransaction[]>,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.transactions {
  max-height: 360px;
  overflow-y: auto;
  padding-right: 10px;

  > .item {
    display: flex;
    width: 100%;
    margin-bottom: 24px;
  }
}
</style>

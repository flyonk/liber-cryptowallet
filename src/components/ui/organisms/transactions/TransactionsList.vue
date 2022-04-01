<template name="TransactionsList">
  <ul class="transactions">
    <li
      v-for="(
        { icon, sum, info, status, code, type, id, direction }, index
      ) in displayedTransactions"
      :key="index"
      class="item"
      @click="$router.push(`/transactions/details/${id}/${direction}`)"
    >
      <transactions-list-item
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
import { computed, PropType } from 'vue';

import { INetTransaction } from '@/models/transaction/transaction';

import TransactionsListItem from '@/components/ui/molecules/TransactionsListItem.vue';

const props = defineProps({
  transactions: {
    type: Array as PropType<INetTransaction[]>,
    default: () => [],
  },
  preview: {
    type: Number,
    default: () => 0,
  },
});

const displayedTransactions = computed(() => {
  return props.preview
    ? props.transactions.slice(0, props.preview)
    : props.transactions;
});
</script>

<style lang="scss" scoped>
.transactions {
  // max-height: 360px;
  overflow-y: auto;
  padding: 0;

  > .item {
    display: flex;
    width: 100%;
    margin-bottom: 24px;
  }
}
</style>

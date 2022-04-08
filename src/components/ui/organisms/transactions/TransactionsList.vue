<template name="TransactionsList">
  <ul class="transactions">
    <li
      v-for="(
        { icon, sum, info, status, code, type, id, to, from }, index
      ) in displayedTransactions"
      :key="index"
      class="item"
      @click="goToRoute(id)"
    >
      <transactions-list-item
        :code="code"
        :from="from"
        :icon="icon"
        :info="info"
        :main-coin="mainCoin"
        :status="status"
        :sum="sum"
        :to="to"
        :type="type"
      />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';
import { useRouter } from 'vue-router';

import { INetTransaction } from '@/models/transaction/transaction';
import { Route } from '@/router/types';

import TransactionsListItem from '@/components/ui/molecules/TransactionListItem/TransactionsListItem.vue';

const router = useRouter();

const props = defineProps({
  transactions: {
    type: Array as PropType<INetTransaction[]>,
    default: () => [],
  },
  preview: {
    type: Number,
    default: () => 0,
  },
  mainCoin: {
    type: String,
    default: '',
  },
});

const displayedTransactions = computed(() => {
  return props.preview
    ? props.transactions.slice(0, props.preview)
    : props.transactions;
});

const goToRoute = (id: string) => {
  // $router.push(`/transactions/details/${id}`)

  router.push({
    name: Route.TransactionsDetails,
    params: {
      id,
    },
    query: {
      'main-coin': props.mainCoin ? props.mainCoin : null,
    },
  });
};
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

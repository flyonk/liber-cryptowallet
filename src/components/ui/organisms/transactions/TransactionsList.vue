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
        :show-coin="$attrs['show-coin']"
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
  router.push({
    name: Route.TransactionsDetails,
    params: {
      id,
      coin: props.mainCoin ? props.mainCoin : 'default',
    },
  });
};
</script>

<style lang="scss" scoped>
.transactions {
  overflow-y: auto;
  padding: 0;

  > .item {
    display: flex;
    width: 100%;
    margin-bottom: 24px;

    &:last-child {
      margin-bottom: 0;
    }
  }
}
</style>

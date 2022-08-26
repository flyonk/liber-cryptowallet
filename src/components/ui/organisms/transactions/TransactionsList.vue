<template name="TransactionsList">
  <ul class="transactions">
    <li
      v-for="(transaction, index) in displayedTransactions"
      :key="index"
      class="item"
      @click="goToRoute(transaction.id, transaction.from, transaction.type)"
    >
      <component
        :is="selectComponent(transaction.type)"
        :transaction="transaction"
        :main-coin="mainCoin"
        :is-currency="showCoin"
        :transaction-type="transactionType"
      />
    </li>
  </ul>
</template>

<script lang="ts" setup>
import { computed, inject, PropType } from 'vue';
import { useRouter } from 'vue-router';

import {
  ETransactionType,
  INetTransaction,
} from '@/models/transaction/transaction';
import { Route } from '@/router/types';
import {
  ExternalTransactionItem,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // TransferTransactionItem,
} from '@/components/ui/molecules/TransactionListItem';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { MTransferTransactionItem, MConvertTransactionItem } = uiKit!;

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
  showCoin: {
    type: Boolean,
    default: true,
  },
  transactionType: {
    type: String,
    default: 'default',
  },
});

const displayedTransactions = computed(() => {
  return props.preview
    ? props.transactions.slice(0, props.preview)
    : props.transactions;
});

const goToRoute = (
  id: string,
  from: { code: string; amount: string },
  type: string
) => {
  if (type === ETransactionType.convert) {
    router.push({
      name: Route.TransactionsDetails,
      params: {
        id,
      },
      query: {
        coin: props.mainCoin ? props.mainCoin : from.code.toLowerCase(),
      },
    });
  } else {
    router.push({
      name: Route.TransactionsDetails,
      params: {
        id,
      },
    });
  }
};

const selectComponent = (type: string) => {
  switch (type) {
    case ETransactionType.convert:
      return MConvertTransactionItem;
    case ETransactionType.transfer:
      return MTransferTransactionItem;
    default:
      return ExternalTransactionItem;
  }
};
</script>

<style lang="scss">
.transactions {
  overflow-y: auto;
  padding: 0;

  > .item {
    display: flex;
    width: 100%;
  }
}
</style>

<style lang="scss">
.transaction-list-item {
  display: flex;
  width: 100%;
  margin-bottom: 24px;

  > .info {
    width: 100%;
    margin-left: 12px;

    > .flex {
      width: 100%;
      justify-content: space-between;

      > .title {
        font-weight: 500;
        font-size: 16px;
        line-height: 21px;
        letter-spacing: -0.0031em;
        color: $color-black;
      }

      > .subtitle {
        font-size: 13px;
        line-height: 18px;
        letter-spacing: -0.0008em;
        color: $color-dark-grey;
      }

      > .status {
        font-weight: 400;
        font-size: 13px;
        line-height: 18px;
        text-align: right;
        letter-spacing: -0.0008em;
      }
      // TODO:fix linter element rules and create variants from pending and received
      > .pending {
        color: $color-yellow-600;
      }

      > .received {
        color: $color-green-600 !important;
      }

      > .sum {
        font-size: 13px;
        line-height: 18px;
        text-align: right;
        letter-spacing: -0.0008em;
        color: $color-dark-grey;
      }
    }

    margin-bottom: 24px;

    &:last-child {
      margin-bottom: 0;
    }
  }

  > .item:last-child {
    margin-bottom: 0;
  }
}
</style>

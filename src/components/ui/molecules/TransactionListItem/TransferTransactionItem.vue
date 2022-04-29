<template>
  <div class="transaction-list-item">
    <transaction-icon-with-status
      :img-path="icon"
      :is-currency="showCoin"
      :size="45"
      :status="transaction.status"
    />
    <div class="info">
      <div class="flex">
        <h1 class="title">
          {{ direction }}
          {{ $filters.toUpperCase(transaction.code) }}
        </h1>
        <p
          :class="{
            received: props.transaction.direction === EDirection.income,
          }"
        >
          {{ directionSign }} {{ transaction.amount }}
          {{ $filters.toUpperCase(transaction.code) }}
        </p>
      </div>
      <div class="flex">
        <div class="subtitle">
          {{ getRelativeDate(props.transaction.date) }}
        </div>
        <p
          v-if="props.transaction.status"
          :class="{
            pending: props.transaction.status === ETransactionStatus.pending,
          }"
          class="status"
        >
          {{ status }}
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';
import { useI18n } from 'vue-i18n';

import { getRelativeDate } from '@/helpers/datetime';

import {
  EDirection,
  ETransactionStatus,
  IDepositTransaction,
} from '@/models/transaction/transaction';
import { TransactionIconWithStatus } from '@/components/ui';

const { tm } = useI18n();

const props = defineProps({
  mainCode: {
    type: String,
    default: '',
  },
  showCoin: {
    type: Boolean,
    default: true,
  },
  date: {
    type: String,
    default: '',
  },
  transaction: {
    type: Object as PropType<IDepositTransaction>,
    required: true,
  },
});

const icon = computed(() => {
  if (!props.mainCode) {
    return props.transaction.code.toLowerCase();
  }

  const mapper = {
    outcome: 'sent',
    income: 'received',
  };

  return mapper[props.transaction.direction as 'income' | 'outcome'];
});

const direction = computed(() =>
  props.transaction.direction === EDirection.income
    ? tm('transactions.operations.buy')
    : tm('transactions.operations.sell')
);

const directionSign = computed(() =>
  props.transaction.direction === EDirection.income ? '+' : '-'
);

const status = computed(() => {
  if (props.transaction.status === 'finished') {
    return null;
  }

  return tm(`transactions.status.${props.transaction.status}`);
});
</script>

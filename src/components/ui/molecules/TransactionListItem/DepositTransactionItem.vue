<template>
  <div class="transaction-list-item">
    <transaction-icon-with-status
      :img-path="icon"
      :is-currency="showCoin"
      :size="45"
      :status="status"
    />
    <div class="info">
      <div class="flex">
        <h1 class="title">
          {{ $t(`transactions.operations.${type}`) }}
          {{ code }}
        </h1>
        <p :class="{ received: sum.startsWith('+') }">
          {{ sum }}
        </p>
      </div>
      <div class="flex">
        <div class="subtitle">{{ info }}</div>
        <p
          v-if="status"
          :class="{
            pending: status === ETransactionStatus.pending,
          }"
          class="status"
        >
          {{ $t(`transactions.status.${status}`) }}
        </p>
        <p v-else class="sum">{{ sum }} {{ code }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ETransactionStatus } from '@/models/transaction/transaction';

import { TransactionIconWithStatus } from '@/components/ui';
import { computed } from 'vue';

const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  sum: {
    type: String,
    default: '',
  },
  info: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: '',
  },
  code: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
  mainCoin: {
    type: String,
    required: true,
  },
  showCoin: {
    type: Boolean,
    default: true,
  },
});

const icon = computed(() => {
  if (props.showCoin) {
    return props.code.toLowerCase();
  }

  const mapper = {
    deposit: 'deposit',
    outcome: 'sent',
    received: 'received',
    income: 'received',
  };

  return mapper[props.type as 'deposit' | 'outcome'];
});
</script>

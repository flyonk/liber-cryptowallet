<template>
  <div class="transaction-list-item">
    <transaction-icon-with-status
      :size="45"
      :img-path="icon"
      :is-currency="true"
    />

    <div class="info">
      <div class="flex">
        <h1 class="title">Get coupons</h1>
        <p>
          {{ total }}
        </p>
      </div>
      <div class="flex">
        <div class="subtitle">
          {{ getRelativeDate(props.transaction.date) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';

import { IConvertTransaction } from '@/models/transaction/transaction';
import { getRelativeDate } from '@/helpers/datetime';

import { TransactionIconWithStatus } from '@/components/ui';

const props = defineProps({
  mainCoin: {
    type: String,
    default: '',
  },
  transaction: {
    type: Object as PropType<IConvertTransaction>,
    required: true,
  },
});

const icon = computed(() => {
  if (!props.mainCoin) {
    return props.transaction.from.code.toLowerCase();
  }

  return 'convert';
});

const total = computed(() => {
  return `- ${
    props.transaction.counter.amount
  } ${props.transaction.counter.code.toUpperCase()}`;
});
</script>

<style lang="scss" scoped></style>

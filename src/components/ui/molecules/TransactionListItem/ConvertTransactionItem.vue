<template>
  <div v-if="!transaction.isCoupon" class="transaction-list-item">
    <transaction-icon-with-status :size="45" img-path="convert" />
    <div class="info">
      <div class="flex">
        <h1 class="title">
          {{ title }}
        </h1>
        <p :class="{ received: direction === EDirection.income }">
          {{ total }}
        </p>
      </div>
      <div class="flex">
        <div class="subtitle">
          {{ subtitle }}
        </div>
        <p v-if="!mainCoin" class="sum received">
          + {{ amounts.to }} {{ toCode }}
        </p>
      </div>
    </div>
  </div>
  <CouponTransactionItem
    v-else
    :transaction="transaction"
    :main-coin="mainCoin"
  />
</template>

<script lang="ts" setup>
import { computed, PropType, ref } from 'vue';

import {
  EDirection,
  IConvertTransaction,
} from '@/models/transaction/transaction';
import { toUpperCase } from '@/helpers/filters';

import { TransactionIconWithStatus } from '@/components/ui';
import CouponTransactionItem from './CouponTransactionItem.vue';

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

const fromCode = ref(toUpperCase(props.transaction.from.code));
const toCode = ref(toUpperCase(props.transaction.to.code));

const subtitle = ref('Converted ' + fromCode.value + ' to ' + toCode.value);

const amounts = ref({
  from: props.transaction.from.amount,
  to: props.transaction.to.amount,
});

const direction = computed((): EDirection => {
  if (fromCode.value === toUpperCase(props.mainCoin)) {
    return EDirection.outcome;
  } else if (toCode.value === toUpperCase(props.mainCoin)) {
    return EDirection.income;
  }

  return EDirection.guard;
});

const title = computed(() => {
  if (props.mainCoin) {
    return direction.value === EDirection.outcome
      ? 'Sold ' + fromCode.value
      : 'Bought ' + toCode.value;
  }

  return fromCode.value + '→' + toCode.value;
});

const total = computed(() => {
  if (props.mainCoin) {
    return direction.value === EDirection.outcome
      ? '- ' + amounts.value.from + ' ' + fromCode.value
      : '+ ' + amounts.value.to + ' ' + toCode.value;
  }

  return '- ' + amounts.value.from + ' ' + fromCode.value;
});
</script>

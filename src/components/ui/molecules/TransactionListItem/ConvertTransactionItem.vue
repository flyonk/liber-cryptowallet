<template>
  <div class="transaction-list-item">
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
</template>

<script lang="ts" setup>
import { computed, PropType, ref } from 'vue';

import {
  EDirection,
  TConvertTransaction,
} from '@/models/transaction/transaction';

import { TransactionIconWithStatus } from '@/components/ui';

const props = defineProps({
  icon: {
    type: String,
    default: '',
  },
  to: {
    type: Object as PropType<TConvertTransaction>,
    default: () => ({} as TConvertTransaction),
  },
  from: {
    type: Object as PropType<TConvertTransaction>,
    default: () => ({} as TConvertTransaction),
  },
  mainCoin: {
    type: String,
    required: true,
  },
});

const fromCode = ref(props.from.code?.toUpperCase());
const toCode = ref(props.to.code?.toUpperCase());

const subtitle = ref('Converted ' + fromCode.value + ' to ' + toCode.value);

const amounts = ref({
  from: props.from?.amount,
  to: props.to?.amount,
});

const direction = computed((): EDirection => {
  if (fromCode.value === props.mainCoin.toUpperCase()) {
    return EDirection.outcome;
  } else if (toCode.value === props.mainCoin.toUpperCase()) {
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

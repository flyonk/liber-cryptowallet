<template name="TransactionDetails">
  <t-top-navigation @click:left-icon="$router.back()">
    <template #title>
      <div class="sum">
        <div class="sum-title">
          {{ directionSign }} {{ transaction.amount }}
          <span class="currency">
            {{ mainCoin }}
          </span>
        </div>
      </div>
    </template>
    <template #right>
      <TransactionIconWithStatus
        :status="transaction.status"
        img-path="convert"
      />
    </template>
    <template #content>
      <div class="transaction-details">
        <div class="header">
          <h2 class="sendto" :class="{ 'color-red': transaction.isCoupon }">
            {{ detailedInfo }}
          </h2>
          <p class="date">
            {{ relativeDate }}
          </p>
        </div>
        <ul class="main mb-5">
          <li class="main-item">
            <p class="name">
              {{ $t('status.title') }}
            </p>
            <TransactionStatus :status="transaction.status" />
          </li>
          <li class="main-item">
            <p class="name">
              {{ $t('transactions.statement') }}
            </p>
            <base-button size="medium" view="flat">
              {{ $t('transactions.download') }}
            </base-button>
          </li>

          <li class="main-item">
            <p class="name" :class="{ 'color-red': transaction.isCoupon }">
              {{ $t('transactions.rate') }}
            </p>
            <p
              class="description"
              :class="{ 'color-red': transaction.isCoupon }"
            >
              {{ feeRate }}
            </p>
          </li>

          <li class="main-item">
            <p class="name">
              {{ $t('transactions.transferFee') }}
            </p>
            <p class="description">
              - {{ transaction.fee.amount }}
              {{ transaction.fee.code.toUpperCase() }}
            </p>
          </li>

          <li class="main-item">
            <p class="name" :class="{ 'color-red': transaction.isCoupon }">
              <template v-if="transaction.isCoupon">
                {{ $t('transactions.receivedCoupons') }}
              </template>
              <template v-else>
                {{
                  isIncome ? $t('transactions.cost') : $t('transactions.bought')
                }}
              </template>
            </p>
            <p
              class="description"
              :class="{ 'color-red': transaction.isCoupon }"
            >
              <template v-if="transaction.isCoupon">
                {{ transaction.counter.amount }}
                {{ transaction.counter.code.toUpperCase() }}
              </template>
              <template v-else>
                {{ isIncome ? '-' : '+' }}
                {{ transaction.counter.amount }}
                {{ transaction.counter.code.toUpperCase() }}
              </template>
            </p>
          </li>
        </ul>
      </div>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';

import {
  EDirection,
  IConvertTransaction,
} from '@/models/transaction/transaction';
import { getRelativeDate } from '@/helpers/datetime';

import {
  BaseButton,
  TransactionIconWithStatus,
  TransactionStatus,
  TTopNavigation,
} from '@/components/ui';

defineEmits(['copy']);
const props = defineProps({
  transaction: {
    type: Object as PropType<IConvertTransaction>,
    required: true,
  },

  mainCoin: {
    type: String,
    default: undefined,
  },
});

const mainCoin = computed(() => props.transaction.code.toUpperCase());
const isIncome = computed(
  () => props.transaction.direction === EDirection.income
);

const directionSign = computed(() => (isIncome.value ? '+' : '-'));

const detailedInfo = computed(() => {
  if (props.transaction.isCoupon) return 'Get coupons';

  return !isIncome.value
    ? 'Sold ' +
        mainCoin.value +
        ' to ' +
        props.transaction.counter.code.toUpperCase()
    : 'Bought ' +
        mainCoin.value +
        ' with ' +
        props.transaction.counter.code.toUpperCase();
});

const feeRate = computed(
  () =>
    '1 ' +
    mainCoin.value +
    ' = ' +
    props.transaction.rate +
    ' ' +
    props.transaction.counter.code.toUpperCase()
);

const relativeDate = computed(() => {
  return getRelativeDate(props.transaction.date);
});
</script>

<style lang="scss" scoped>
.color-red {
  color: $color-red-500 !important;
}
</style>

<template name="TransactionDetails">
  <t-top-navigation @click:left-icon="$router.back()">
    <template #title>
      <div class="sum">
        <div class="sum-title">
          {{ transaction.sum }}
          <span class="currency">
            {{ mainCoin }}
          </span>
        </div>
      </div></template
    >
    <template #right
      ><TransactionIconWithStatus
        :status="transaction.status"
        img-path="convert"
    /></template>
    <template #content>
      <div class="transaction-details">
        <div class="header">
          <h2 class="sendto">{{ transaction.detailedInfo }}</h2>
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
            <p class="name">
              {{ $t('transactions.rate') }}
            </p>
            <p class="description">{{ feeRate }}</p>
          </li>

          <li class="main-item">
            <p class="name">
              {{ $t('transactions.transferFee') }}
            </p>
            <p class="description">- {{ transaction.fee }} {{ mainCoin }}</p>
          </li>

          <li class="main-item">
            <p class="name">
              {{
                transaction.direction === EDirection.income
                  ? $t('transactions.cost')
                  : $t('transactions.bought')
              }}
            </p>
            <p class="description">
              {{ transaction.direction === EDirection.income ? '-' : '+' }}
              {{ transaction.oppositeCoin.amount }}
              {{ transaction.oppositeCoin.code }}
            </p>
          </li>
        </ul>
      </div>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';

import { EDirection, INetTransaction } from '@/models/transaction/transaction';
import { getRelativeDate } from '@/helpers/datetime';

import {
  BaseButton,
  TTopNavigation,
  TransactionIconWithStatus,
  TransactionStatus,
} from '@/components/ui';

defineEmits(['copy']);
const props = defineProps({
  transaction: {
    type: Object as PropType<INetTransaction>,
    required: true,
  },

  mainCoin: {
    type: String,
    required: true,
  },
});

const mainCoin = computed(() => props.transaction.code.toUpperCase());

const feeRate = computed(
  () =>
    '1 ' +
    mainCoin.value +
    ' = ' +
    props.transaction.rate +
    ' ' +
    props.transaction.oppositeCoin?.code
);

const relativeDate = computed(() => {
  return getRelativeDate(
    props.transaction.finishDate
      ? (props.transaction.finishDate as string)
      : (props.transaction.startDate as string)
  );
});
</script>

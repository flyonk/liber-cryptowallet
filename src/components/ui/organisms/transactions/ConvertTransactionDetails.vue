<template name="TransactionDetails">
  <div class="transaction-details">
    <TopNavigation class="header" @click:left-icon="$router.back()">
      <div class="sum">
        <div class="sum-title">
          {{ transaction.sum }}
          <span class="currency">
            {{ mainCoin }}
          </span>
        </div>
      </div>
      <template #right>
        <TransactionIconWithStatus
          :status="transaction.status"
          img-path="convert"
        />
      </template>
    </TopNavigation>
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
          0.05005 {{ transaction.feeCode.toUpperCase() }}
        </p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';

import { EDirection, INetTransaction } from '@/models/transaction/transaction';
import { getRelativeDate } from '@/helpers/datetime';

import {
  BaseButton,
  TopNavigation,
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
    props.transaction.feeCode?.toUpperCase()
);

const relativeDate = computed(() => {
  return getRelativeDate(
    props.transaction.finishDate
      ? (props.transaction.finishDate as string)
      : (props.transaction.startDate as string)
  );
});
</script>

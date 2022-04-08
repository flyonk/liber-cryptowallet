<template name="TransactionDetails">
  <div class="transaction-details">
    <TopNavigation class="header" @click:left-icon="$router.back()">
      <div class="sum">
        <div class="sum-title">
          {{ transaction.sum }}
          <span class="currency">
            {{ transaction.code }}
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
      <h2 class="sendto">{{ infoText }}</h2>
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
        <p class="description">0,12345678 {{ transaction.code }}</p>
      </li>

      <li class="main-item">
        <p class="name">
          {{ $t('transactions.transferFee') }}
        </p>
        <p class="description">0,12345678 {{ transaction.code }}</p>
      </li>

      <li class="main-item">
        <p class="name">
          {{ $t('transactions.bought') }}
        </p>
        <p class="description">0,12345678 {{ transaction.code }}</p>
      </li>

      <li class="main-item">
        <div class="inner">
          <p class="name">
            {{ $t('transactions.id') }}
          </p>
          <p class="transaction">{{ transaction.id }}</p>
        </div>
        <i class="icon ci-copy" @click="$emit('copy', transaction.id)" />
      </li>
    </ul>
    <h2 class="explorer">
      {{ $t('common.explorer') }}
    </h2>
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { INetTransaction } from '@/models/transaction/transaction';
import { getRelativeDate } from '@/helpers/datetime';

import {
  BaseButton,
  TopNavigation,
  TransactionIconWithStatus,
  TransactionStatus,
} from '@/components/ui';
import { PropType } from 'vue-demi';

defineEmits(['copy']);
const props = defineProps({
  transaction: {
    type: Object as PropType<INetTransaction>,
    required: true,
  },
});

const infoText = computed(
  () =>
    'Sold from ' +
    props.transaction.from?.code?.toUpperCase() +
    ' to ' +
    props.transaction.to?.code?.toUpperCase()
);

const relativeDate = computed(() => {
  return getRelativeDate(
    props.transaction.finishDate
      ? props.transaction.finishDate
      : props.transaction.startDate
  );
});
</script>

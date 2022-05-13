<template>
  <div class="transaction-details">
    <TopNavigation class="header" @click:left-icon="$router.back()">
      <div class="sum">
        <div class="sum-title">
          {{ transaction.amount }}
          <span class="currency">
            {{ $filters.toUpperCase(transaction.code) }}
          </span>
        </div>
      </div>
      <template #right>
        <TransactionIconWithStatus
          v-if="transaction.status"
          :status="transaction.status"
          img-path="deposit"
        />
      </template>
    </TopNavigation>
    <div class="header">
      <h2 class="sendto">
        From {{ $filters.toUpperCase(transaction.code) }} wallet
      </h2>
      <p class="date">
        {{ getRelativeDate(transaction.date) }}
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
        <base-button class="button" size="medium" view="flat">
          {{ $t('transactions.download') }}
        </base-button>
      </li>
      <li class="main-item">
        <p class="name">
          {{ $t('views.deposit.wallet.network') }}
        </p>
        <span class="text--callout font-weight--medium">
          {{ $filters.toUpperCase(transaction.code) }}
        </span>
      </li>
      <li class="main-item">
        <div class="inner">
          <p class="name">
            {{ $t('transactions.address') }}
          </p>
          <span class="transaction">
            <!--TODO Change mock data-->
            {{ transaction.address }}
          </span>
        </div>
        <i class="icon ci-copy" @click="$emit('copy', transaction.address)" />
      </li>
      <li class="main-item">
        <div class="inner">
          <p class="name">
            {{ $t('transactions.id') }}
          </p>
          <span class="transaction">
            {{ transaction.txid }}
          </span>
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
import { PropType } from 'vue';

import { IDepositTransaction } from '@/models/transaction/transaction';
import { getRelativeDate } from '@/helpers/datetime';

import {
  BaseButton,
  TopNavigation,
  TransactionIconWithStatus,
  TransactionStatus,
} from '@/components/ui';

defineEmits(['copy']);

defineProps({
  transaction: {
    type: Object as PropType<IDepositTransaction>,
    required: true,
  },
});
</script>

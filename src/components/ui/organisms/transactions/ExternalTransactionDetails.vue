<template>
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
          v-if="transaction.status"
          :status="transaction.status"
          img-path="deposit"
        />
      </template>
    </TopNavigation>
    <div class="header">
      <h2 class="sendto">{{ transaction.info }}</h2>
      <p class="date">
        {{
          getRelativeDate(
            transaction.finishDate
              ? transaction.finishDate
              : transaction.startDate
          )
        }}
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
          {{ transaction.code }}
        </span>
      </li>
      <li class="main-item">
        <div class="inner">
          <p class="name">
            {{ $t('transactions.address') }}
          </p>
          <span class="transaction">
            1Mtree35df4543sdgErtrryryEe13rrsd21213Opa139z0l
          </span>
        </div>
        <i class="icon ci-copy" @click="$emit('copy', transaction.id)" />
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

import { INetTransaction } from '@/models/transaction/transaction';
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
    type: Object as PropType<INetTransaction>,
    required: true,
  },
});
</script>

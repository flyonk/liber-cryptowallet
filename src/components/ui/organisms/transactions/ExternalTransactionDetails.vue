<template>
  <div class="transaction-details">
    <t-top-navigation @click:left-icon="$router.back()">
      <template #title
        ><div class="sum">
          <div class="sum-title">
            {{ transaction.amount }}
            <span class="currency">
              {{ $filters.toUpperCase(transaction.code) }}
            </span>
          </div>
        </div></template
      >
      <template #right>
        <TransactionIconWithStatus
          v-if="transaction.status"
          :status="transaction.status"
          img-path="deposit"
      /></template>
      <template #content
        ><div class="header">
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
            <m-base-button class="button" size="medium" view="flat">
              {{ $t('transactions.download') }}
            </m-base-button>
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
            <i
              class="icon ci-copy"
              @click="$emit('copy', transaction.address)"
            />
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
        </h2></template
      >
    </t-top-navigation>
  </div>
</template>

<script lang="ts" setup>
import { inject, PropType } from 'vue';

import { IDepositTransaction } from '@/models/transaction/transaction';
import { getRelativeDate } from '@/helpers/datetime';

import {
  TransactionIconWithStatus,
  TransactionStatus,
  TTopNavigation,
} from '@/components/ui';
import { EUiKit } from '@/types/uiKit';

const uiKit = inject(EUiKit.uiKit);
const { MBaseButton } = uiKit as any;

defineEmits(['copy']);

defineProps({
  transaction: {
    type: Object as PropType<IDepositTransaction>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.explorer {
  font-weight: 600;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.0043em;
  color: $color-primary;
  text-shadow: 0 1px 2px rgb(0 0 0 / 4%);
}
</style>

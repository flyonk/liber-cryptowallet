<template>
  <div class="transaction-details">
    <TopNavigation class="header" @click:left-icon="$router.back()">
      <div class="sum">
        <div class="sum-title">
          - {{ transaction.amount }}
          <span class="currency">
            {{ $filters.toUpperCase(transaction.code) }}
          </span>
        </div>
      </div>
      <template #right>
        <TransactionIconWithStatus
          v-if="transaction.status"
          :status="transaction.status"
          img-path="sent"
        />
      </template>
    </TopNavigation>
    <div class="header">
      <h2 class="sendto">{{ $t('common.from') }} {{ contragent }}</h2>
      <p class="date">
        {{ getRelativeDate(transaction.date) }}
      </p>
      <div v-if="isPendingStatus" class="controls">
        <base-button size="medium" icon-left="ci-share">
          <p>{{ $t('common.shareCta') }}</p>
        </base-button>
        <base-button class="btn -cancel" icon-left="ci-close_big" size="medium">
          {{ $t('common.cancelCta') }}
        </base-button>
      </div>
    </div>
    <div v-if="isPendingStatus" class="notification">
      {{ $t('transactions.paymentLinkExpires') }}
    </div>
    <ul class="main">
      <li class="main-item">
        <p class="name">
          {{ $t('transactions.noReference') }}
        </p>
      </li>
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
      <li v-if="transaction.fee" class="main-item">
        <p class="name">
          {{ $t('transactions.transferFee') }}
        </p>
        <p class="description">
          {{ transaction.fee.amount }}
          {{ $filters.toUpperCase(transaction.fee.code) }}
        </p>
      </li>
    </ul>
    <div v-if="isPendingStatus" class="report-block">
      <span class="font-weight--medium">Report an issue</span>
      <i class="ci-chevron_big_right" />
    </div>
    <div v-else class="button-container">
      <base-button v-if="isFailedStatus" block view="secondary">
        Retry Transaction
      </base-button>
      <base-button v-else block view="secondary">
        Repeat Transaction
      </base-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';

import {
  ETransactionStatus,
  ITransferTransaction,
} from '@/models/transaction/transaction';
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
    type: Object as PropType<ITransferTransaction>,
    required: true,
  },
});

const isPendingStatus = computed(
  () => props.transaction.status === ETransactionStatus.pending
);
const isFailedStatus = computed(
  () => props.transaction.status === ETransactionStatus.failed
);
const contragent = computed(() => {
  if (!props.transaction.contragent) {
    return '';
  }

  return props.transaction.contragent.id;
});
</script>

<style lang="scss" scoped>
.notification {
  padding: 18px 16px;
  background: $color-light-grey-100;
  margin: 0 -16px;
}

.report-block {
  padding: 22px 16px;
  display: flex;
  width: 100%;
  justify-content: space-between;
  border: 1px solid $color-brand-2-50;
  box-sizing: border-box;
  border-radius: 12px;
  background: $color-white;
}

.button-container {
  position: fixed;
  bottom: 56px;
  left: 16px;
  right: 16px;
}
</style>

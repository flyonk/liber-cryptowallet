<template>
  <div class="transaction-details">
    <t-top-navigation with-fixed-footer @click:left-icon="$router.back()">
      <template #title
        ><div class="sum">
          <div class="sum-title">
            {{ directionSign }} {{ transaction.amount }}
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
          img-path="sent"
      /></template>
      <template #content>
        <div class="header">
          <h2 class="sendto">{{ titleText }} {{ contragent }}</h2>
          <p class="date">
            {{ getRelativeDate(transaction.date) }}
          </p>
          <div v-if="isPendingStatus" class="controls">
            <base-button size="medium" icon-left="ci-share">
              <p>{{ $t('common.shareCta') }}</p>
            </base-button>
            <base-button
              class="btn -cancel"
              icon-left="ci-close_big"
              size="medium"
            >
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
      </template>
      <template #fixed-footer
        ><template v-if="isIncome">
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
        </template></template
      >
    </t-top-navigation>
  </div>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';
import { useI18n } from 'vue-i18n';

import {
  EDirection,
  ETransactionStatus,
  ITransferTransaction,
} from '@/models/transaction/transaction';
import { getRelativeDate } from '@/helpers/datetime';

import {
  BaseButton,
  TransactionIconWithStatus,
  TransactionStatus,
  TTopNavigation,
} from '@/components/ui';

const { tm } = useI18n();

defineEmits(['copy']);

const props = defineProps({
  transaction: {
    type: Object as PropType<ITransferTransaction>,
    required: true,
  },
});

const isIncome = computed(
  () => props.transaction.direction === EDirection.income
);

const directionSign = computed(() => (isIncome.value ? '+' : '-'));
const titleText = computed(() =>
  isIncome.value ? tm('common.from') : tm('common.to')
);

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

.header {
  > .sum {
    display: flex;
    justify-content: space-between;
    margin: 20px 0 4px;
  }

  > .sendto {
    font-weight: 500;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.0008em;
    color: $color-brand-primary;
    margin-bottom: 4px;
  }

  > .date {
    font-weight: 500;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.0008em;
    color: $color-dark-grey;
    margin-bottom: 16px;
  }
}
</style>

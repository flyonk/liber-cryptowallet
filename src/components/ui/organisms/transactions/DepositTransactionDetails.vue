<template name="TransactionDetails">
  <t-top-navigation @click:left-icon="$router.back()">
    <template #title>
      <div class="sum">
        <div class="sum-title">
          {{ transaction.sum }}
          <span class="currency">
            {{ transaction.code }}
          </span>
        </div>
      </div></template
    >
    <template #subtitle></template>
    <template #right>
      <TransactionIconWithStatus
        v-if="transaction.status"
        :status="transaction.status"
        img-path="deposit"
    /></template>
    <template #content>
      <div class="transaction-details">
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
          <div class="controls">
            <button v-if="transaction.type === 'send'" class="btn -pdf">
              <img class="icon" src="@/assets/icon/file_pdf.svg" />
              <p>{{ $t('transactions.downloadState') }}</p>
            </button>
            <button
              v-if="transaction.type === 'payment-link'"
              class="btn -share"
            >
              <img class="icon" src="@/assets/icon/share.svg" />
              <p>{{ $t('common.shareCta') }}</p>
            </button>
            <button
              v-if="transaction.type === 'payment-link'"
              class="btn btn -cancel"
            >
              <img class="icon" src="@/assets/icon/close_red.svg" />
              <p>{{ $t('common.cancelCta') }}</p>
            </button>
          </div>
        </div>
        <ul class="main mb-5">
          <li class="main-item">
            <p class="name">
              {{ $t('transactions.noReference') }}
            </p>
          </li>
          <li class="main-item">
            <p class="name">
              {{ $t('status.title') }}
            </p>
            <div
              v-if="transaction.status"
              :class="{
                pending: transaction.status === ETransactionStatus.pending,
              }"
              class="status"
            >
              {{ $t(`transactions.status.${transaction.status}`) }}
            </div>
          </li>
          <li class="main-item">
            <p class="name">
              {{ $t('transactions.paymentTo') }}
            </p>
            <div class="item-right">
              <img class="icon" src="@/assets/icon/green_ok.svg" />
              <p class="name">{{ receiver }} ∙ {{ transaction.code }}</p>
            </div>
          </li>
          <li v-if="transaction.fee" class="main-item">
            <p class="name">
              {{ $t('transactions.transferFee') }}
            </p>
            <p class="description">0,12345678 {{ transaction.code }}</p>
          </li>
          <li v-if="transaction.from?.code" class="main-item">
            <p class="name">
              {{ $t('transactions.convertTransaction') }}
            </p>
            <p class="description">
              {{ $t('common.from') }}
              {{ transaction.from?.amount }}
              {{ transaction.from?.code.toUpperCase() }}
            </p>
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
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { computed, PropType } from 'vue';

import {
  EDirection,
  ETransactionStatus,
  INetTransaction,
} from '@/models/transaction/transaction';
import { useProfileStore } from '@/stores/profile';
import { getRelativeDate } from '@/helpers/datetime';

import { TTopNavigation, TransactionIconWithStatus } from '@/components/ui';

const pStore = useProfileStore();

defineEmits(['copy']);

const props = defineProps({
  transaction: {
    type: Object as PropType<INetTransaction>,
    required: true,
  },
});

const receiver = computed(() =>
  EDirection.income === props.transaction.direction
    ? `To ${pStore.user.phone}`
    : props.transaction.info
);
</script>

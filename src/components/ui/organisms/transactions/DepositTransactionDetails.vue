<template name="TransactionDetails">
  <div class="transaction-details">
    <div class="header">
      <img
        alt="arrow-left"
        class="back"
        src="@/assets/icon/arrow-left.svg"
        @click="$router.push({ name: Route.DashboardHome })"
      />
      <div class="sum">
        <div class="sum-title">
          {{ transaction.sum }}
          <span class="currency">
            {{ transaction.code }}
          </span>
        </div>
        <div class="arrow">
          <img alt="right" src="@/assets/icon/short_right.svg" />
        </div>
      </div>
      <h2 class="sendto">{{ transaction.info }}</h2>
      <p class="date">
        <!--TODO: diff from now-->
        {{
          transaction.finishDate
            ? transaction.finishDate
            : transaction.startDate
        }}
      </p>
      <div class="controls">
        <button v-if="transactionType === 'send'" class="btn -pdf">
          <img class="icon" src="@/assets/icon/file_pdf.svg" />
          <p>{{ $t('transactions.downloadState') }}</p>
        </button>
        <button v-if="transactionType === 'payment-link'" class="btn -share">
          <img class="icon" src="@/assets/icon/share.svg" />
          <p>{{ $t('common.shareCta') }}</p>
        </button>
        <button
          v-if="transactionType === 'payment-link'"
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
        <div class="inner">
          <img alt="folders" src="@/assets/icon/folders.svg" />
        </div>
      </li>
    </ul>
    <h2 class="explorer">
      {{ $t('common.explorer') }}
    </h2>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';

import transactionService from '@/services/transactionService';
import {
  EDirection,
  ETransactionStatus,
  INetTransaction,
} from '@/models/transaction/transaction';
import { useProfileStore } from '@/stores/profile';

import { Route } from '@/router/types';

const route = useRoute();
const pStore = useProfileStore();

const receiver = ref('');
let transaction: Ref<INetTransaction> = ref({} as INetTransaction);
let transactionType = ref('');

onMounted(async () => {
  try {
    if (!route.params.id) return;
    transaction.value = (await transactionService.getTransactionById(
      route.params.id as string
    )) as INetTransaction;

    await getTransactionReceiver();
    transactionType.value = transaction.value.type;
  } catch (err) {
    console.log(err);
  }
});

async function getTransactionReceiver() {
  receiver.value = (
    EDirection.income === transaction.value.direction
      ? `To ${pStore.user.phone}`
      : transaction.value.info
  ) as string;
}
</script>

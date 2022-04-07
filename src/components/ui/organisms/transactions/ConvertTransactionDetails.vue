<template name="TransactionDetails">
  <div class="transaction-details">
    <TopNavigation
      class="header"
      @click:left-icon="$router.push({ name: Route.DashboardHome })"
    >
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
        <!--TODO: diff from now-->
        {{
          transaction.finishDate
            ? transaction.finishDate
            : transaction.startDate
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
        <i class="icon ci-copy" />
      </li>
    </ul>
    <h2 class="explorer">
      {{ $t('common.explorer') }}
    </h2>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';

import transactionService from '@/services/transactionService';
import { INetTransaction } from '@/models/transaction/transaction';

import {
  BaseButton,
  TopNavigation,
  TransactionIconWithStatus,
  TransactionStatus,
} from '@/components/ui';

import { Route } from '@/router/types';

const route = useRoute();

let transaction: Ref<INetTransaction> = ref({} as INetTransaction);

const infoText = computed(
  () =>
    'Sold from ' +
    transaction.value.from?.code?.toUpperCase() +
    ' to ' +
    transaction.value.to?.code?.toUpperCase()
);

onMounted(async () => {
  try {
    if (!route.params.id) return;
    transaction.value = (await transactionService.getTransactionById(
      route.params.id as string
    )) as INetTransaction;
  } catch (err) {
    console.log(err);
  }
});
</script>

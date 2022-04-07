<template>
  <div class="transaction-list-item">
    <img :src="icon" class="icon" />
    <div class="info">
      <div class="flex">
        <h1 class="title">
          {{ $t(`transactions.operations.${type}`) }}
          {{ code }}
        </h1>
        <p :class="{ received: sum.startsWith('+') }">
          {{ sum }}
        </p>
      </div>
      <div class="flex">
        <div class="subtitle">{{ info }}</div>
        <p
          v-if="status"
          :class="{
            pending: status === ETransactionStatus.pending,
          }"
          class="status"
        >
          {{ $t(`transactions.status.${status}`) }}
        </p>
        <p v-else class="sum">{{ sum }} {{ code }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ETransactionStatus } from '@/models/transaction/transaction';

defineProps({
  icon: {
    type: String,
    default: '',
  },
  sum: {
    type: String,
    default: '',
  },
  info: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    default: '',
  },
  code: {
    type: String,
    default: '',
  },
  type: {
    type: String,
    default: '',
  },
});
</script>

<template>
  <div class="transaction-list-item">
    <img class="icon" :src="transaction.icon" />
    <div class="info">
      <div class="flex">
        <h1 class="title">
          {{ $t(`transactions.operations.${transaction.type}`) }}
          {{ transaction.code }}
        </h1>
        <p :class="{ received: transaction.sum.startsWith('+') }">
          {{ transaction.sum }}
        </p>
      </div>
      <div class="flex">
        <div class="subtitle">{{ transaction.info }}</div>
        <p
          v-if="transaction.status"
          :class="{
            pending: transaction.status === ETransactionStatus.pending,
          }"
        >
          {{ $t(`transactions.status.${transaction.status}`) }}
        </p>
        <p v-else class="sum">{{ transaction.sum }} {{ transaction.code }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  INetTransaction,
  ETransactionStatus,
} from '@/models/transaction/transaction';
import { PropType } from 'vue-demi';

defineProps({
  transaction: {
    type: Object as PropType<INetTransaction>,
    required: true,
  },
  icon: {
    type: String,
  },
});
</script>

<style lang="scss">
.transaction-list-item {
  display: flex;
  width: 100%;
  margin-bottom: 24px;

  > .icon {
    margin-right: 12px;
    width: 40px;
    height: 40px;
  }

  > .info {
    width: 100%;

    > .flex {
      width: 100%;
      justify-content: space-between;

      > .title {
        font-weight: 500;
        font-size: 16px;
        line-height: 21px;
        letter-spacing: -0.0031em;
      }

      > .subtitle {
        font-size: 13px;
        line-height: 18px;
        letter-spacing: -0.0008em;
        color: $color-dark-grey;
      }

      > .pending {
        color: $color-yellow-600;
      }

      > .received {
        color: $color-green-600;
      }

      > .sum {
        font-size: 13px;
        line-height: 18px;
        text-align: right;
        letter-spacing: -0.0008em;
        color: $color-dark-grey;
      }
    }
  }
}
</style>

<template>
  <div class="transaction-list-item">
    <img class="icon" :src="icon" />
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
        >
          {{ $t(`transactions.status.${status}`) }}
        </p>
        <p v-else class="sum">{{ sum }} {{ code }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  INetTransaction,
  ETransactionStatus,
} from '@/models/transaction/transaction';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PropType } from 'vue-demi';

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

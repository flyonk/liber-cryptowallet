<template name="TransactionsList">
  <ul class="transactions">
    <li
      v-for="(transaction, index) in transactions"
      :key="index"
      class="item"
      @click="$router.push('/transactions/details')"
    >
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
          <div class="subtitle">{{ transaction.direction }}</div>
          <p
            v-if="transaction.status"
            :class="{ pending: transaction.status === 'Pending' }"
          >
            {{ $t(`transactions.status.${transaction.status}`) }}
          </p>
          <p v-else class="sum">{{ transaction.sum }} {{ transaction.code }}</p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

import { INetTransaction } from '@/models/transaction/transaction';

defineProps({
  transactions: {
    type: Array as PropType<INetTransaction[]>,
    default: () => [],
  },
});
</script>

<style lang="scss" scoped>
.transactions {
  max-height: 360px;
  overflow-y: auto;
  padding-right: 10px;

  > .item {
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
}
</style>

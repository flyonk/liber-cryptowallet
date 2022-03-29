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
          {{ transaction.sum
          }}<span class="currency">{{ transaction.code }}</span>
        </div>
        <div class="arrow">
          <img alt="right" src="@/assets/icon/short_right.svg" />
        </div>
      </div>
      <h2 class="sendto">{{ transaction.info }}</h2>
      <p class="date">
        <!-- TODO: add number depends -->
        2 {{ $t('common.daysAgo') }}
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
          class="status"
          :class="{
            pending: transaction.status === ETransactionStatus.pending,
          }"
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
import { INetTransaction } from '@/models/transaction/transaction';
import {
  ETransactionStatus,
  EDirection,
} from '@/models/transaction/transaction';
import { useProfileStore } from '@/stores/profile';

import { Route } from '@/router/types';

const route = useRoute();
const pStore = useProfileStore();

const transactionType = ref('payment-link');
const receiver = ref('');
let transaction: Ref<INetTransaction> = ref({} as INetTransaction);

onMounted(async () => {
  try {
    if (!route.params.id) return;
    transaction.value = (await transactionService.getTransactionById(
      route.params.id as string
    )) as INetTransaction;

    await getTransactionReceiver();
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

<style lang="scss" scoped>
.transaction-details {
  padding: 32px 16px 0;
  height: 100%;

  > .header {
    height: 29%;

    > .sum {
      display: flex;
      justify-content: space-between;
      margin-bottom: 4px;

      > .arrow {
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        width: 48px;
        height: 48px;
        background: $color-light-grey-600;
      }
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

    > .controls {
      display: flex;
      margin-bottom: 40px;

      > .btn {
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 8px;
        font-size: 13px;
        line-height: 18px;
        letter-spacing: -0.0008em;
        font-weight: 600;
        color: $color-white;
        background: $color-primary;
        height: 40px;
        margin-right: 8px;

        &.-pdf {
          width: 192px;
        }

        &.-share {
          width: 97px;
        }

        &.-cancel {
          width: 104px;
          background: $color-red-50;
          color: $color-red;
        }

        > .icon {
          margin-right: 10px;
        }
      }
    }
  }

  > .explorer {
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.0043em;
    color: $color-primary;
    text-shadow: 0 1px 2px rgb(0 0 0 / 4%);
  }
}

.sum-title {
  display: flex;
  align-items: center;
  font-weight: 600;
  font-size: 28px;
  line-height: 34px;
  letter-spacing: 0.0038em;

  > .currency {
    font-size: 22px;
    line-height: 34px;
    letter-spacing: -0.0026em;
    padding-left: 8px;
  }
}

.main-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 53px;
  border-bottom: 1px solid rgb(175 179 195 / 30%);

  &:first-child {
    border-top: 1px solid rgb(175 179 195 / 30%);
  }

  > .name {
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    display: flex;
    align-items: center;
    letter-spacing: -0.0031em;
    color: $color-dark-grey;
  }

  > .status {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 87px;
    height: 31px;
    background: $color-yellow-100;
    border-radius: 100px;
    color: $color-yellow-800;

    > .complete {
      background: $color-green-100;
      color: $color-green-800;
    }

    > .reverted {
      background: $color-red-100;
      color: $color-red-700;
    }

    > .pending {
      color: $color-yellow-600;
    }

    > .received {
      background: $color-green-100;
      color: $color-green-800;
    }
  }

  > .description {
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    text-align: right;
    letter-spacing: -0.0031em;
  }

  > .inner {
    > .name {
      font-weight: 500;
      font-size: 16px;
      line-height: 21px;
      display: flex;
      align-items: center;
      letter-spacing: -0.0031em;
      color: $color-dark-grey;
    }

    > .transaction {
      font-weight: 500;
      font-size: 16px;
      line-height: 21px;
      letter-spacing: -0.0031em;
    }
  }
}

.item-right {
  display: flex;

  > .name {
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    display: flex;
    align-items: center;
    text-align: right;
    letter-spacing: -0.0031em;
    color: $color-brand-primary;
  }

  > .icon {
    margin-right: 9px;
  }
}
</style>

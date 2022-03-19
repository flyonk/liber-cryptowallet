<template>
  <div class="transactions-list">
    <div class="transactions flex items-center mb-5">
      <ul v-if="hasTransactions" class="list">
        <li
          v-for="(transaction, index) in transactions"
          :key="index"
          class="item"
          @click="$router.push('/transactions/details')"
        >
          <div class="image">
            <img class="icon" :src="transaction.img" />
          </div>
          <div class="info">
            <div class="flex">
              <h1 class="title">{{ transaction.info }}</h1>
              <p
                class="sum"
                :class="{ '-received': transaction.sum.startsWith('+') }"
              >
                {{ transaction.sum }}
              </p>
            </div>
            <div class="flex">
              <div class="subtitle">
                {{ transaction.contractor }}
              </div>
              <p
                v-if="transaction.status === 'Pending'"
                :class="{ pending: transaction.status === 'Pending' }"
              >
                {{ transaction.status }}
              </p>
            </div>
          </div>
        </li>
      </ul>
      <template v-else>
        <img src="@/assets/icon/clock.svg" class="mr-2" />
        <p class="text-dark-gray">
          {{ $t('views.dashboard.home.noTransactions') }}
        </p>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  ERequestFundsStatus,
  ETransactionStatus,
  ETransactionType,
  TTransaction,
  // _getTransactionIcon,
} from '@/models/transaction/transaction';
import transactionService from '@/services/transactionService';
import { computed, onBeforeUpdate, ref } from 'vue';
import { onMounted } from 'vue-demi';
import { useI18n } from 'vue-i18n';

const { tm } = useI18n();

defineProps({
  limit: Number,
  page: Number,
  preview: Number,
});

let transactions: any = ref([
  // {
  //   id: '4',
  //   txid: '4xd',
  //   amount: '0.15',
  //   sum: '+ 55.5 USDT',
  //   info: 'Convert TBTC to USDT',
  //   img: _getTransactionIcon(ETransactionType.convert),
  //   timestamp: '1647525472', //15.03.22
  //   status: ETransactionStatus.completed,
  //   type: ETransactionType.convert,
  //   code: 'BTC',
  //   contractor: '0.15 BTC',
  // },
  // {
  //   id: 'string',
  //   txid: 'string',
  //   amount: '0.001',
  //   sum: '+ 0.0095 BTC',
  //   info: 'Transfer BTC',
  //   timestamp: '1647339981', //15.03.22
  //   status: ETransactionStatus.completed,
  //   type: ETransactionType.deposit,
  //   img: _getTransactionIcon(ETransactionType.deposit),
  //   code: 'BTC',
  //   contractor: '+79110110101',
  // },
  // {
  //   id: 'string',
  //   txid: 'string',
  //   amount: '0.001',
  //   sum: '+ 0.0012 BTC',
  //   info: 'Deposit BTC',
  //   timestamp: '1647339981', //15.03.22
  //   status: ETransactionStatus.completed,
  //   type: ETransactionType.deposit,
  //   img: _getTransactionIcon(ETransactionType.deposit),
  //   code: 'BTC',
  //   contractor: 'My Dude',
  // },
  // {
  //   id: 'string',
  //   txid: 'string',
  //   amount: '0.9',
  //   sum: '- 0.9 ETH',
  //   info: 'Send ETH',
  //   timestamp: '1647339981', //15.03.22
  //   status: ETransactionStatus.completed,
  //   type: ETransactionType.transfer,
  //   img: _getTransactionIcon(ETransactionType.transfer),
  //   code: 'ETH',
  //   contractor: 'test@example.com',
  // },
]);

onMounted(async () => {
  transactions.value = await transactionService.getUserTransaction();

  transactions.value = transactions.value.map(_getTransactionDataByType);
});

onBeforeUpdate(() => {
  console.log('onBeforeUpdate');
  //TODO:implement pagination
});

type TInternalComponentTransaction = {
  info: string;
  contractor: string;
  sum: string;
  status: ETransactionStatus | ERequestFundsStatus;
  img: string;
};

const _getTransactionDataByType = (
  transaction: TTransaction
): TInternalComponentTransaction => {
  if (transaction.type === ETransactionType.deposit)
    return {
      info: `${tm('transactions.operations.deposit')} ${transaction.code}`,
      contractor: `From Bitcoin address`, //TODO: resolve it
      sum: `+ ${transaction.amount} ${transaction.code}`,
      status: transaction.status,
      img: require('@/assets/icon/transactions/deposit.svg'),
    };

  if (transaction.type === ETransactionType.deposit)
    return {
      info: `${tm('transactions.operations.received')} ${transaction.code}`,
      contractor: `From ${
        transaction.contractor.email
          ? transaction.contractor.email
          : transaction.contractor.phone
      }`, //TODO: fix it only by email
      sum: `+ ${transaction.amount} ${transaction.code}`,
      status: transaction.status,
      img: require('@/assets/icon/transactions/received.svg'),
    };

  if (transaction.type === ETransactionType.transfer)
    return {
      info: `${tm('transactions.operations.sent')} ${transaction.code}`,
      contractor: `To ${
        transaction.contractor.email
          ? transaction.contractor.email
          : transaction.contractor.phone
      }`, //TODO: fix it only by email
      sum: `- ${transaction.amount} ${transaction.code}`,
      status: transaction.status,
      img: require('@/assets/icon/transactions/sent.svg'),
    };

  return {
    info: '',
    contractor: '',
    sum: '',
    status: ETransactionStatus.pending,
    img: '',
  };
};

const hasTransactions = computed(() => transactions.value.length > 0);
</script>

<style scoped lang="scss">
.transactions-list {
  > .header {
    > .button {
      font-weight: 550;
      font-size: 13px;
      line-height: 18px;
      letter-spacing: -0.0008em;
      color: $color-primary;
    }
  }

  > .transactions {
    > .list {
      width: 100%;

      > .item {
        display: flex;
        width: 100%;
        margin-bottom: 24px;

        > .image {
          position: relative;

          > .icon {
            margin-right: 12px;
            width: 40px;
            height: 40px;
          }

          > .badge {
            position: absolute;
            right: 13px;
            bottom: 3px;
            // border-radius: 50%;
            width: 10px;
            height: 10px;
            display: flex;
          }
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
              font-style: normal;
              font-size: 13px;
              line-height: 18px;
              text-align: right;
              letter-spacing: -0.0008em;
            }

            > .sum {
              font-weight: 500;
              font-size: 16px;
              line-height: 21px;
              letter-spacing: -0.0031em;

              &.-received {
                color: $color-green-600;
              }
            }
          }
        }
      }
    }
  }
}
</style>

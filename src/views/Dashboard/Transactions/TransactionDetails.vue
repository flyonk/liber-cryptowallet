<template name="TransactionDetails">
  <template v-if="transaction">
    <component
      :is="component"
      :main-coin="mainCoin"
      :transaction="transaction"
      @copy="copyToClipboard"
    />
  </template>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, Ref, ref } from 'vue';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';

import transactionService from '@/services/transactionService';
import {
  ETransactionType,
  INetTransaction,
} from '@/models/transaction/transaction';
import { Clipboard } from '@capacitor/clipboard';
import { useToast } from 'primevue/usetoast';
import { useErrorsStore } from '@/stores/errors';

import {
  ConvertTransactionDetails,
  ExternalTransactionDetails,
  TransferTransactionDetails,
} from '@/components/ui/organisms/transactions';

const route = useRoute();
const errorsStore = useErrorsStore();
const { t } = useI18n();
const toast = useToast();

let transaction: Ref<INetTransaction> = ref({} as INetTransaction);
const mainCoin = ref('');

onBeforeMount(async () => {
  try {
    if (!route.params.id) return;

    if (route.query.coin) {
      transaction.value =
        (await transactionService.getTransactionDetailsByCoinAndId(
          route.params.id as string,
          route.query.coin as string
        )) as INetTransaction;
      mainCoin.value = route.params.coin as string;

      return;
    }

    transaction.value = (await transactionService.getTransactionById(
      route.params.id as string
    )) as INetTransaction;
  } catch (err) {
    errorsStore.handle(err, 'TransactionDetails', 'onMounted');
  }
});

const component = computed(() => {
  switch (transaction.value.type) {
    case ETransactionType.convert:
      return ConvertTransactionDetails;
    case ETransactionType.deposit:
      return ExternalTransactionDetails;
    default:
      return TransferTransactionDetails;
  }
});

const copyToClipboard = async (data: string) => {
  try {
    await Clipboard.write({
      string: data,
    });

    toast.add({
      summary: t('transactions.transactionIdCopied'),
      life: 3000,
      closable: false,
    });
  } catch (err) {
    errorsStore.handle(
      err,
      'TransactionDetails.vue',
      'copyToClipboard',
      t('transactions.transactionIdCopyFail') as string
    );
  }
};
</script>

<style lang="scss">
.transaction-details {
  // padding: 0 16px;
  height: 100%;

  > .header {
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
          margin-left: 8px;
          background: $color-red-50;

          > .container {
            > i {
              color: $color-red-500;
              font-size: 18px;
            }

            > .label {
              color: $color-red-500;
            }
          }
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
  padding: 24px 0;

  &:not(:last-child) {
    border-bottom: 1px solid rgb(175 179 195 / 30%);
  }

  > .button {
    min-width: 0;
  }

  > .icon {
    color: $color-brand-primary;
    font-size: 24px;
  }

  > .name {
    font-weight: 400;
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
    padding: 5px 12px;
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
      font-weight: 400;
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
      word-break: break-all;
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

<template>
  <div class="dashboard-container">
    <MDashboardCoinInfo
      :selected-account="selectedAccount"
      :accounts="accounts"
      :verification-status="10"
      class="coin-info"
    >
      <template #controllers>
        <div class="controls">
          <base-button
            view="finance-action"
            size="medium"
            icon-left="icon-plus_circle"
          >
            Buy
          </base-button>
          <base-button
            view="finance-action"
            size="medium"
            icon-left="icon-qr_code"
          >
            Pay
          </base-button>
          <base-button
            view="finance-action"
            size="medium"
            icon-left="icon-send"
          >
            Send
          </base-button>
          <base-button view="finance-action" size="medium"> ... </base-button>
        </div>
      </template>
    </MDashboardCoinInfo>

    <div class="transactions">
      <div class="header">
        <span class="title text--footnote font-weight--semibold">{{
          $t('views.dashboard.home.transactions')
        }}</span>
        <base-button
          size="medium"
          view="flat"
          class="button"
          @click="$router.push({ name: Route.CouponsTransactions })"
        >
          {{ $t('views.dashboard.home.seeAll') }}
        </base-button>
      </div>

      <transactions-list
        :preview="3"
        :transactions="transactions"
        transaction-type="coupons"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue';

import { useCouponsStore } from '@/applications/coupons/stores/coupons';
import { Route } from '@/router/types';

import {
  BaseButton,
  MDashboardCoinInfo,
  TransactionsList,
} from '@/components/ui';

const couponsStore = useCouponsStore();

const accounts = computed(() => couponsStore.getAccounts);
const transactions = computed(() => couponsStore.getTransactions);
const selectedAccount = ref({
  code: '',
  balance: '',
  imgSrc: '',
  baseBalanceConversion: '',
  baseBalanceConversionCode: '',
});

onBeforeMount(async () => {
  await Promise.all([
    couponsStore.setAccounts(),
    couponsStore.setTransactions(),
  ]);

  const [firstAccount] = accounts.value;

  selectedAccount.value = {
    code: firstAccount.code,
    balance: firstAccount.balance,
    imgSrc: firstAccount.imageUrl,
    baseBalanceConversion: firstAccount.baseBalanceConversion,
    baseBalanceConversionCode: firstAccount.baseBalanceConversionCode,
  };
});
</script>

<style lang="scss" scoped>
.coin-info {
  padding: 16px 10px;
  border-radius: 13px;
  background: $color-light-grey-400;
}

.controls {
  display: flex;

  > * {
    margin-right: 8px;
  }
}

.dashboard-container {
  min-height: 100%;

  > .transactions {
    margin: 22px 0 0 0;
    height: 100%;

    > .header {
      margin: 0 0 16px;
      display: flex;
      justify-content: space-between;

      > .title {
        color: $color-dark-grey;
      }

      > .button:deep {
        min-width: auto;
      }
    }
  }
}
</style>

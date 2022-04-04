<template name="DepositeSelectCoin">
  <div class="page-wrapper">
    <BaseCoinListSelect
      @back-button="router.push({ name: Route.DashboardHome })"
      @select-coin="selectCoin"
    />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { onBeforeMount } from 'vue';

import { Route } from '@/router/types';
import { useAccountStore } from '@/stores/account';
import { useDepositStore } from '@/stores/deposit';
import { IAccount } from '@/models/account/account';
import { ICoin } from '@/models/coin/coins';

import { BaseCoinListSelect } from '@/components/ui';

const router = useRouter();
const accountStore = useAccountStore();
const depositStore = useDepositStore();

onBeforeMount(async () => {
  await Promise.all([accountStore.getAccountList()]);
});

const selectAccount = (coinCode: string) => {
  return accountStore.getAccounts.find(({ code }) => code === coinCode);
};

const selectCoin = async (selectedAccount: ICoin) => {
  depositStore.setAccountInfo(selectAccount(selectedAccount.code) as IAccount);

  await router.push({
    name: Route.DepositNetwork,
  });
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  margin: 15px;
  flex-grow: 1;
}

.main-title {
  font-style: normal;
  font-weight: 800;
  font-size: 28px;
  line-height: 34px;
  letter-spacing: 0.0038em;
  margin-bottom: 10px;
  margin-top: 20px;
}

.page-header {
  margin-bottom: 32px;
}

.input-label {
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: 12px;

  > .search {
    background: $color-light-grey;
    color: $color-dark-grey;
    width: 100%;
    height: 44px;
    padding-left: 40px;
    font-size: 16px;
    line-height: 21px;
    align-items: center;
    letter-spacing: -0.0031em;
    border: 0;
    outline: none;
  }

  > .icon {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
  }
}

.page-main {
  > .title {
    font-weight: 500;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.0008em;
    color: $color-brand-primary;
    margin-bottom: 16px;
  }
}

.coin-list {
  margin-bottom: 40px;
}
</style>

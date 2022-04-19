<template name="DepositeSelectCoin">
  <div class="page-wrapper">
    <TopNavigation
      left-icon-name="icon-app-navigation-back"
      :without-title="true"
      @click:left-icon="$router.push({ name: Route.DashboardHome })"
    />
    <div class="select-coin">
      <BaseCoinListSelect
        @back-button="router.push({ name: Route.DashboardHome })"
        @select-coin="selectCoin"
      />
    </div>
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
import TopNavigation from '@/components/ui/molecules/TopNavigation.vue';

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

  > .select-coin {
    margin-top: 21px;
  }
}
</style>

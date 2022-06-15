<template name="DepositeSelectCoin">
  <t-top-navigation
    left-icon-name="icon-app-navigation-back"
    nav-without-title
    @click:left-icon="$router.push({ name: Route.DashboardHome })"
  >
    <template #title></template>
    <template #content
      ><div class="select-coin">
        <base-coin-list-select
          :coins="coins"
          @back-button="router.push({ name: Route.DashboardHome })"
          @select-coin="selectCoin"
        /></div
    ></template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';
import { computed, onBeforeMount } from 'vue';

import { Route } from '@/router/types';
import { useAccountStore } from '@/applications/liber/stores/account';
import { useDepositStore } from '@/applications/liber/stores/deposit';
import { useCoinsStore } from '@/applications/liber/stores/coins';
import { IAccount } from '@/models/account/account';
import { ICoin } from '@/applications/liber/models/funds/coin';

import { BaseCoinListSelect, TTopNavigation } from '@/components/ui';

const router = useRouter();
const accountStore = useAccountStore();
const depositStore = useDepositStore();
const coinsStore = useCoinsStore();

const coins = computed(() => coinsStore.coins);

onBeforeMount(async () => {
  await Promise.all([accountStore.getAccountList(), coinsStore.fetchCoins()]);
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

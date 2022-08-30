<template>
  <t-top-navigation
    left-icon-name="icon-app-navigation-back"
    @click:left-icon="$router.back()"
  >
    <template #content
      ><div class="select-coin">
        <base-coin-list-select
          :coins="mappedCoins"
          @back-button="router.push({ name: Route.DashboardHome })"
          @select-coin="selectCoin"
        /></div
    ></template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

import { useAccountStore } from '@/applications/liber/stores/account';
import { useCoinsStore } from '@/applications/liber/stores/coins';
import { useErrorsStore } from '@/stores/errors';

import { BaseCoinListSelect, TTopNavigation } from '@/components/ui';
import { Route } from '@/router/types';
import { computed, onMounted } from 'vue';
import { ICoinItem } from '@/applications/liber/models/funds/coin';

const accountStore = useAccountStore();
const coinsStore = useCoinsStore();
const errorsStore = useErrorsStore();

const router = useRouter();

onMounted(() => {
  try {
    coinsStore.fetchCoins();
  } catch (error) {
    errorsStore.handle({
      err: error,
      name: 'dashboard/account/AddAccount/SelectCoin.vue',
      ctx: 'onMounted',
      description: 'Error when getting the list of coins, please try later.',
    });
  }
});

const coins = computed(() => coinsStore.coins);
const accounts = computed(() => accountStore.getAccounts);

const mappedCoins = computed(() =>
  coins.value.map((coin) => {
    return {
      ...coin,
      available: !accounts.value.find((account) => account.code === coin.code),
    };
  })
);

const selectCoin = (coin: ICoinItem) => {
  if (!coin.available) return;

  accountStore.setNewAccountParams('coin', coin.code);

  router.push({
    name: Route.AccountAddSelectNetwork,
  });
};
</script>

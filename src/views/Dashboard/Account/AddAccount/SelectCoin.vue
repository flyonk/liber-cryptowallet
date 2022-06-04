<template>
  <t-top-navigation
    left-icon-name="icon-app-navigation-back"
    @click:left-icon="$router.back()"
  >
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

import { ICoin } from '@/models/coin/coins';
import { useAccountStore } from '@/stores/account';
import { useCoinsStore } from '@/stores/coins';
import { useErrorsStore } from '@/stores/errors';

import { BaseCoinListSelect, TTopNavigation } from '@/components/ui';
import { Route } from '@/router/types';
import { computed, onMounted } from 'vue';

const accountStore = useAccountStore();
const coinsStore = useCoinsStore();
const errorsStore = useErrorsStore();

const router = useRouter();

onMounted(() => {
  try {
    coinsStore.fetchCoins();
  } catch (error) {
    errorsStore.handle(
      error,
      'dashboard/account/AddAccount/SelectCoin.vue',
      'onMounted',
      'Error when getting the list of coins, please try later.'
    );
  }
});

const coins = computed(() => coinsStore.coins);

const selectCoin = (coin: ICoin) => {
  accountStore.setNewAccountParams('coin', coin.code);

  router.push({
    name: Route.AccountAddSelectNetwork,
  });
};
</script>

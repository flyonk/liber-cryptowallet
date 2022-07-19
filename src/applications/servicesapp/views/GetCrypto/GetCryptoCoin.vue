<template>
  <t-top-navigation
    left-icon-name="icon-app-navigation-back"
    @click:left-icon="router.push({ name: ServicesRoutes.DashboardHome })"
  >
    <template #content
      ><div class="select-coin">
        <base-coin-list-select
          :coins="coins"
          @back-button="router.push({ name: ServicesRoutes.DashboardHome })"
          @select-coin="selectCoin"
        /></div
    ></template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

import { ICoin } from '@/applications/liber/models/funds/coin';
import { useFundsStore } from '@/applications/servicesapp/stores/funds';
import { useCoinsStore } from '@/applications/liber/stores/coins';
import { useErrorsStore } from '@/stores/errors';

import { BaseCoinListSelect, TTopNavigation } from '@/components/ui';
import { ServicesRoutes } from '@/applications/servicesapp/router/types';
import { computed, onMounted } from 'vue';

const fundsStore = useFundsStore();
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

const selectCoin = (coin: ICoin) => {
  fundsStore.setCrypto(
    {
      name: coin.code,
      code: coin.code,
      img: coin.imageUrl as string,
    },
    'to'
  );

  router.push({
    name: ServicesRoutes.GetCryptoFunds,
  });
};
</script>

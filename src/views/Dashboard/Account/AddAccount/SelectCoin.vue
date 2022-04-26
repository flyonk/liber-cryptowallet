<template>
  <div class="page-wrapper">
    <TopNavigation
      left-icon-name="icon-app-navigation-back"
      @click:left-icon="$router.back()"
    />
    <BaseCoinListSelect
      @back-button="$router.back()"
      @select-coin="selectCoin"
    />
  </div>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

import { ICoin } from '@/models/coin/coins';
import { useAccountStore } from '@/stores/account';

import { BaseCoinListSelect, TopNavigation } from '@/components/ui';
import { Route } from '@/router/types';

const accountStore = useAccountStore();
const router = useRouter();

const selectCoin = (coin: ICoin) => {
  accountStore.setNewAccountParams('coin', coin.code);

  router.push({
    name: Route.AccountAddSelectNetwork,
  });
};
</script>

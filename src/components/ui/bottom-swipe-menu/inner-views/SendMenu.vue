<template>
  <ul class="send-menu">
    <router-link :to="{ name: Route.PayRecepientsLiber }" class="menu-item">
      <i class="icon icon-send" />
      <p class="text">Send Funds</p>
    </router-link>
    <li class="menu-item" @click="goToRoute">
      <i class="icon icon-convert" />
      <p class="text">{{ $t('transactions.convert.title') }}</p>
    </li>
    <li class="menu-item">
      <i class="icon icon-ask-for-funds" />
      <p class="text">Ask for Funds</p>
    </li>
    <li class="menu-item">
      <i class="icon icon-borrow" />
      <p class="text">Borrow Coin</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed, ComputedRef, onMounted } from 'vue';

import { Route } from '@/router/types';
import { useRouter } from 'vue-router';

import { useAccountStore } from '@/stores/account';
import { IAccount } from '@/models/account/account';

const accountStore = useAccountStore();
const router = useRouter();

onMounted(async () => {
  await Promise.all([
    accountStore.getAccountList(),
    accountStore.getAccountBalance(),
  ]);
});

const accounts = computed(() => accountStore.getAccounts) as ComputedRef<
  IAccount[]
>;

const goToRoute = () => {
  const [{ code: firstAccountCode }] = accounts.value;

  router.push({
    name: Route.ConvertFunds,
    query: {
      code: firstAccountCode ? firstAccountCode : 'tbtc',
    },
  });
};
</script>

<style lang="scss" scoped>
.send-menu {
  bottom: 0;
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-bottom: 50px;
}

.menu-item {
  display: flex;
  align-items: center;
  margin-bottom: 30px;

  > .icon {
    margin-right: 20px;
    color: blue;
    font-size: 40px;
  }

  > .text {
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: -0.0031em;
    color: $color-black;
  }
}
</style>

<template>
  <ul class="send-menu">
    <router-link :to="{ name: Route.PayRecepientsLiber }" class="menu-item">
      <i class="icon icon-send" />
      <p class="text">Send Funds</p>
    </router-link>
    <li class="menu-item" @click="onClick">
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
import { Route } from '@/router/types';
import { onMounted, computed, ComputedRef } from 'vue';
import { useRouter } from 'vue-router';
import { useFundsStore } from '@/stores/funds';
import { useAccountStore } from '@/stores/account';
import { IAccount } from '@/models/account/account';
import { STATIC_BASE_URL } from '@/constants';

const router = useRouter();

const fundStore = useFundsStore();
const accountStore = useAccountStore();

onMounted(async () => {
  await Promise.all([
    accountStore.getAccountList(),
    accountStore.getAccountBalance(),
  ]);
});

const accounts = computed(() => accountStore.getAccounts) as ComputedRef<
  IAccount[]
>;
function onClick() {
  console.log('balance', accounts.value);
  fundStore.setCrypto(
    getCorrectCurrencyName(accounts.value[0].name),
    accounts.value[0].code,
    _getSrcImageUrl(accounts.value[0].code),
    'from'
  );
  router.push('/convert');
}

function _getSrcImageUrl(name: string) {
  //TODO change to real image from service
  return `${STATIC_BASE_URL}/currencies/${name.toLowerCase()}.svg`;
}

function getCorrectCurrencyName(name: string) {
  if (name === 'tbtc') return 'BTC';
  if (name === 'tltc') return 'LTC';
}
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

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

    <li class="menu-item" @click="onClick('borrow')">
      <i class="icon icon-borrow" />
      <p class="text">Borrow stablecoin</p>
    </li>
    <li class="menu-item" @click="onClick('ask')">
      <i class="icon icon-ask-for-funds" />
      <p class="text">Ask a user for funds</p>
    </li>
    <li class="menu-item" @click="onClick('withdraw')">
      <i class="icon icon-withdraw" />
      <p class="text">Withdraw</p>
    </li>
    <li class="menu-item" @click="onClick('download')">
      <i class="icon icon-send" />
      <p class="text">Download Statement</p>
    </li>
    <li class="menu-item" @click="onClick('add')">
      <i class="icon icon-convert" />
      <p class="text">Add account</p>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { computed, ComputedRef, onMounted } from 'vue';

import { Route } from '@/router/types';
import { useRouter } from 'vue-router';
import { useUIStore } from '@/stores/ui';
import { useAccountStore } from '@/stores/account';
import { IAccount } from '@/models/account/account';

const accountStore = useAccountStore();
const router = useRouter();
const uiStore = useUIStore();
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

const onClick = (action: string) => {
  switch (action) {
    case 'borrow':
      break;
    case 'ask':
      break;
    case 'withdraw':
      router.push({ name: Route.Withdraw });
      break;
    case 'download':
      break;
    case 'add':
      router.push({ name: Route.AccountAdd });
      break;
    default:
      break;
  }

  uiStore.setStateModal('sendMenu', false);
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
    color: $color-primary-500;
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

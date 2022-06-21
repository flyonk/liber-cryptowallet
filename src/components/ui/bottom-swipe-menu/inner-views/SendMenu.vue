<template>
  <ul class="send-menu">
    <BottomSwipeMenuItem
      icon="icon-send"
      :text="$t('transactions.carousel.sendFunds')"
      :show-menu-item="showSendFunds"
      @click="
        router.push({
          name: Route.PayRecepientsLiber,
        })
      "
    />

    <BottomSwipeMenuItem
      icon="icon-convert"
      :text="$t('transactions.convert.title')"
      :show-menu-item="showConvertFunds"
      @click="goToRoute"
    />

    <BottomSwipeMenuItem
      icon="icon-borrow"
      text="Borrow stablecoin"
      @click="onClick('borrow')"
    />

    <BottomSwipeMenuItem
      icon="icon-ask-for-funds"
      text="Ask a user for funds"
      @click="onClick('ask')"
    />

    <BottomSwipeMenuItem
      icon="icon-withdraw"
      text="Withdraw"
      :show-menu-item="showWithdrawFunds"
      @click="onClick('withdraw')"
    />

    <BottomSwipeMenuItem
      icon="icon-send"
      text="Download Statement"
      @click="onClick('download')"
    />

    <BottomSwipeMenuItem
      icon="icon-convert"
      text="Add account"
      @click="onClick('add')"
    />
  </ul>
</template>

<script setup lang="ts">
import { ref, computed, ComputedRef, onMounted } from 'vue';

import { Route } from '@/router/types';
import { useRouter } from 'vue-router';
import { useUIStore } from '@/stores/ui';
import { useAccountStore } from '@/applications/liber/stores/account';
import { IAccount } from '@/models/account/account';
import BottomSwipeMenuItem from '@/components/ui/atoms/BottomSwipeMenuItem.vue';

import { CRYPTO_TRANSACTIONS } from '@/constants';

const showSendFunds = ref(CRYPTO_TRANSACTIONS.includes('send'));
const showConvertFunds = ref(CRYPTO_TRANSACTIONS.includes('convert'));
const showWithdrawFunds = ref(CRYPTO_TRANSACTIONS.includes('withdraw'));

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
</style>

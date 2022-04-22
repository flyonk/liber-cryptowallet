<template>
  <top-navigation @click:left-icon="$router.back()">
    {{ $t('views.deposit.selectNetwork.chooseNetwork') }}
  </top-navigation>

  <m-network-select-answer @select="onSelect" />
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

import { TDictionaryItem } from '@/components/ui/molecules/MNetworkSelectAnswer.vue';
import { useAccountStore } from '@/stores/account';

import { MNetworkSelectAnswer, TopNavigation } from '@/components/ui';
import { Route } from '@/router/types';

const accountStore = useAccountStore();
const router = useRouter();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const onSelect = (answer: TDictionaryItem) => {
  //TODO change to network soon
  accountStore.setNewAccountParams('network', 'default');

  router.push({
    name: Route.AccountAddShowWallet,
  });
};
</script>

<style scoped lang="scss"></style>

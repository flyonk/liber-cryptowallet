<template>
  <t-top-navigation @click:left-icon="$router.back()">
    <template #title>
      {{ $t('views.deposit.selectNetwork.chooseNetwork') }}</template
    >
    <template #content><m-network-select-answer @select="onSelect" /></template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { useRouter } from 'vue-router';

import { TDictionaryItem } from '@/components/ui/molecules/MNetworkSelectAnswer.vue';
import { useAccountStore } from '@/applications/liber/stores/account';

import { MNetworkSelectAnswer, TTopNavigation } from '@/components/ui';
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

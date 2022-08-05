<template name="AddAccount">
  <t-top-navigation
    left-icon-name="icon-app-navigation-close"
    @click:left-icon="$router.push({ name: Route.DashboardHome })"
  >
    <template #content>
      <BaseCoinListSelect :coins="coins" @select-coin="selectCoin" />
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import BaseCoinListSelect from '@/components/ui/organisms/BaseCoinListSelect.vue';
import { useCoinsStore } from '@/applications/liber/stores/coins';
import { TTopNavigation } from '@/components/ui';
import { Route } from '@/router/types';

const coinStore = useCoinsStore();

const coins = computed(() => coinStore.getCoins);

function selectCoin() {
  console.log('select coin');
}
</script>

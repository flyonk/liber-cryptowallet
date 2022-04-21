<template>
  <top-navigation>
    {{ coinCode.toUpperCase() }}
  </top-navigation>

  <account-details :coin-code="coinCode" />
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import { useAccountStore } from '@/stores/account';

import { AccountDetails, TopNavigation } from '@/components/ui';

const accountStore = useAccountStore();

const coinCode = computed(() => accountStore.getNewAccountParams.coin);
</script>

<style scoped></style>

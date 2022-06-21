<template>
  <ul class="send-menu">
    <template v-for="(item, id) in itemsList" :key="id">
      <BottomSwipeMenuItem
        :icon="item.icon"
        :text="item.text"
        @click="item.onClick"
      />
    </template>
  </ul>
</template>

<script setup lang="ts">
import BottomSwipeMenuItem from '@/components/ui/atoms/BottomSwipeMenuItem.vue';
import itemsList from '../BottomSwipeMenuList';

// import { CRYPTO_TRANSACTIONS } from '@/constants';

// const showSendFunds = ref(CRYPTO_TRANSACTIONS.includes('send'));
// const showConvertFunds = ref(CRYPTO_TRANSACTIONS.includes('convert'));
// const showWithdrawFunds = ref(CRYPTO_TRANSACTIONS.includes('withdraw'));
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

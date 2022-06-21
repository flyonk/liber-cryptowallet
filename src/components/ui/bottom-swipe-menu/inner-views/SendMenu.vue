<template>
  <ul class="send-menu">
    <template v-for="(item, id) in menuItems" :key="id">
      <BottomSwipeMenuItem
        :icon="item.icon"
        :text="item.text"
        @click="item.onClick"
      />
    </template>
  </ul>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import BottomSwipeMenuItem from '@/components/ui/atoms/BottomSwipeMenuItem.vue';
import itemsList, {
  getFilteredItemsList,
  EAreaMenuItemVisible,
} from '../BottomSwipeMenuList';

const menuItems = computed(() => {
  // get menu by required area: crypto, fiat or coupons
  return getFilteredItemsList(itemsList, EAreaMenuItemVisible.crypto);
});

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

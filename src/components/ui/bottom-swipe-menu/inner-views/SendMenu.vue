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
import { useRoute } from 'vue-router';

import { CouponRoutes } from '@/applications/coupons/router/types';

import BottomSwipeMenuItem from '@/components/ui/atoms/BottomSwipeMenuItem.vue';
import itemsList, {
  getFilteredItemsList,
  EAreaMenuItemVisible,
} from '../BottomSwipeMenuList';

const route = useRoute();

const menuItems = computed(() => {
  const name = route.name;

  // apply list for coupons
  if (Object.values(CouponRoutes).includes(name)) {
    return getFilteredItemsList(itemsList, EAreaMenuItemVisible.coupons);
  }

  // apply list for crypto by default
  return getFilteredItemsList(itemsList, EAreaMenuItemVisible.crypto);
});
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

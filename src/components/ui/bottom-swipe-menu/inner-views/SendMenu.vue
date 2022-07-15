<template>
  <ul class="send-menu">
    <template v-for="(item, id) in menuItems" :key="id">
      <a-bottom-swipe-menu-item
        :icon="item.icon"
        :text="$t('' + getTitle(item))"
        show-menu-item
        @click="item.onClick"
      />
    </template>
  </ul>
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue';
import { useRoute } from 'vue-router';

import { CouponRoutes } from '@/applications/coupons/router/types';

import itemsList, {
  getFilteredItemsList,
  EAreaMenuItemVisible,
  IBottomSwipeMenuItem,
} from '../BottomSwipeMenuList';

const ABottomSwipeMenuItem = defineAsyncComponent(() => {
  return import(`@liber-biz/crpw-ui-kit-${process.env.VUE_APP_BRAND}`).then(
    (lib) => lib.ABottomSwipeMenuItem
  );
});

const route = useRoute();

const menuItems = computed(() => {
  const name = route.name as CouponRoutes;

  // apply list for coupons
  if (Object.values(CouponRoutes).includes(name)) {
    return getFilteredItemsList(itemsList, EAreaMenuItemVisible.coupons);
  }

  // apply list for crypto by default
  return getFilteredItemsList(itemsList, EAreaMenuItemVisible.crypto);
});

const getTitle = (item: IBottomSwipeMenuItem) => {
  const name = route.name as CouponRoutes;

  // apply list for coupons
  if (Object.values(CouponRoutes).includes(name)) {
    return item[`text${EAreaMenuItemVisible.coupons}`];
  }

  // apply list for crypto by default
  return item[`text${EAreaMenuItemVisible.crypto}`];
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

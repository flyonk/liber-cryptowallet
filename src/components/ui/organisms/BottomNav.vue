<template name="BottomNav">
  <div class="bottom-nav">
    <ul class="navbar-list">
      <NavBarItem
        :route-name="computedRoute['DashboardHome']"
        :label="$t('bottomNav.home')"
        active-hash-tag="home-active"
        hash-tag="home"
      />
      <NavBarItem
        :route-name="computedRoute['AccountMain']"
        :label="$t('bottomNav.account')"
        active-hash-tag="account-active"
        hash-tag="account"
        :is-not-route="
          computedRoute['AccountMain'] === CouponRoutes.AccountMain
        "
        @click.prevent="handleClick(computedRoute['AccountMain'])"
      />
      <li class="item" @click="openMenu">
        <img
          class="icon center-image"
          src="@/assets/icon/navbar/send.svg"
          alt="Send"
        />
        <p class="label" :class="{ '-active': isMenuOpen.value === true }">
          {{ $t('bottomNav.send') }}
        </p>
      </li>
      <NavBarItem
        :route-name="computedRoute['RecepientsPhone']"
        :label="$t('bottomNav.recipients')"
        active-hash-tag="recipients-active"
        hash-tag="recipients"
      />
      <NavBarItem
        :route-name="computedRoute['Invite']"
        :label="$t('bottomNav.invite')"
        active-hash-tag="gift-active"
        hash-tag="gift"
      />
    </ul>
    <bottom-swipe-menu
      :is-menu-open="isMenuOpen"
      :menu-type="menuType"
      @close-menu="closeMenu"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { Route } from '@/router/types';
import { CouponRoutes } from '@/applications/coupons/router/types';
import { useRoute } from 'vue-router';

import { NavBarItem } from '@/components/ui';
import BottomSwipeMenu from '@/components/ui/bottom-swipe-menu/BottomSwipeMenu.vue';

import { useUIStore } from '@/stores/ui';

const uiStore = useUIStore();

let isMenuOpen = computed(() => uiStore.getModalStates.sendMenu);

const route = useRoute();

const computedRoute = computed(() => {
  const name = route.name;

  // apply list for coupons
  if (Object.values(CouponRoutes).includes(name)) {
    return CouponRoutes;
  }

  // apply list for crypto by default
  return Route;
});

const menuType = computed(() => {
  if (route.name === Route.AccountDetail) {
    // Menu for crypto transactions
    return 'send';
  }
  return 'send';
});

function openMenu() {
  uiStore.setStateModal('sendMenu', true);
}

function closeMenu() {
  uiStore.setStateModal('sendMenu', false);
}

const handleClick = (name: string) => {
  if (name === CouponRoutes.AccountMain) {
    openMenu();
    return false;
  }
};
</script>

<style lang="scss" scoped>
.bottom-nav {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 0 0 15px rgb(0 0 0 / 10%);
  width: 100%;
  position: absolute;
  bottom: 0;
  padding-bottom: 30px;
  background-color: $color-white;
}

.navbar-list {
  background-color: $color-white;
  margin-top: auto;
  width: 100%;
  height: 65px;
  display: flex;
  justify-content: space-around;

  > .item {
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    text-decoration: none;

    > .svg {
      width: 24px;
      height: 24px;
      fill: $color-red;
    }

    > .center-image {
      position: relative;
      top: -10px;
    }
  }
}
</style>

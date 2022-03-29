<template name="BottomNav">
  <div class="bottom-nav">
    <ul class="navbar-list">
      <NavBarItem
        :routeName="Route.DashboardHome"
        :label="$t('bottomNav.home')"
        activeHashTag="home-active"
        hashTag="home"
      />
      <NavBarItem
        :routeName="Route.AccountMain"
        :label="$t('bottomNav.account')"
        activeHashTag="account-active"
        hashTag="account"
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
        :routeName="Route.RecepientsPhone"
        :label="$t('bottomNav.recipients')"
        activeHashTag="recipients-active"
        hashTag="recipients"
      />
      <NavBarItem
        :routeName="Route.RecepientsPhone"
        :label="$t('bottomNav.invite')"
        activeHashTag="gift-active"
        hashTag="gift"
      />
    </ul>
    <bottom-swipe-menu
      :is-menu-open="isMenuOpen"
      menu-type="send"
      @close-menu="closeMenu"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Route } from '@/router/types';

import { NavBarItem } from '@/components/ui';
import BottomSwipeMenu from '@/components/ui/bottom-swipe-menu/BottomSwipeMenu.vue';

let isMenuOpen = ref(false);

function openMenu() {
  isMenuOpen.value = true;
}

function closeMenu() {
  isMenuOpen.value = false;
}
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

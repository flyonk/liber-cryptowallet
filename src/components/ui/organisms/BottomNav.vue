<template name="BottomNav">
  <div class="bottom-nav">
    <!-- m-bottom-nav: 
    the item hashtag is unique and it is used to check for the active element -->
    <m-bottom-nav
      :nav-items="navItems"
      :main-item="mainItem"
      show-main-item
      :active-item="currentActiveItem"
      @click:item="handleClickItem"
      @click:main="openMenu"
    />
    <bottom-swipe-menu
      :is-menu-open="isMenuOpen"
      :menu-type="menuType"
      @close-menu="closeMenu"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, inject, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Route } from '@/router/types';
import { CouponRoutes } from '@/applications/coupons/router/types';
import { useRouter, useRoute } from 'vue-router';

import BottomSwipeMenu from '@/components/ui/bottom-swipe-menu/BottomSwipeMenu.vue';

import { useUIStore } from '@/stores/ui';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { MBottomNav } = uiKit!;

const uiStore = useUIStore();

const { tm } = useI18n();

const router = useRouter();
const route = useRoute();

enum EItemHashTag {
  home = 'home',
  recipients = 'recipients',
  gift = 'gift',
  account = 'account',
  homeActive = 'home-active',
  recipientsActive = 'recipients-active',
  giftActive = 'gift-active',
  accountActive = 'account-active',
}

type TNavBarItem = {
  isActive: boolean;
  label: string;
  iconSrc: string;
  activeHashTag: string;
  hashTag: string;
};

const navItems: Ref<TNavBarItem[] | undefined> = ref([
  {
    label: tm('bottomNav.home'),
    activeHashTag: EItemHashTag.homeActive,
    hashTag: EItemHashTag.home,
    iconSrc: require('@/assets/icon/navbar/sprite.svg'),
  },
  {
    label: 'Accounts',
    activeHashTag: EItemHashTag.accountActive,
    hashTag: EItemHashTag.account,
    iconSrc: require('@/assets/icon/navbar/sprite.svg'),
  },
  {
    label: 'Recipients',
    activeHashTag: EItemHashTag.recipientsActive,
    hashTag: EItemHashTag.recipients,
    iconSrc: require('@/assets/icon/navbar/sprite.svg'),
  },
  {
    label: 'Invite',
    activeHashTag: EItemHashTag.giftActive,
    hashTag: EItemHashTag.gift,
    iconSrc: require('@/assets/icon/navbar/sprite.svg'),
  },
]);

let isMenuOpen = computed(() => uiStore.getModalStates.sendMenu);

const mainItem = ref({
  label: 'Send',
  isActive: isMenuOpen.value,
  iconSrc: require('@/assets/icon/navbar/send.svg'),
});

const computedRoute = computed(() => {
  const name = route.name;

  // apply list for coupons
  if (Object.values(CouponRoutes).includes(name as CouponRoutes)) {
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

const currentActiveItem = computed(() => {
  const mapper: { [key in Route | CouponRoutes]: EItemHashTag } = {
    // home
    [Route.DashboardLiber]: EItemHashTag.home,
    [CouponRoutes.DashboardHome]: EItemHashTag.home,

    // account
    [Route.AccountMain]: EItemHashTag.account,
    [CouponRoutes.AccountMain]: EItemHashTag.account,

    // recipients
    [Route.RecipientsLiber]: EItemHashTag.recipients,
    [CouponRoutes.RecipientsLiber]: EItemHashTag.recipients,

    // invite
    [Route.Invite]: EItemHashTag.gift,
    [CouponRoutes.Invite]: EItemHashTag.gift,
  };

  return mapper[route.name as Route | CouponRoutes];
});

function openMenu() {
  uiStore.setStateModal('sendMenu', true);
}

function closeMenu() {
  uiStore.setStateModal('sendMenu', false);
}

function handleAccountItemClick(name: string) {
  if (name === CouponRoutes.AccountMain) {
    openMenu();
    return false;
  }
}

function handleClickItem(data: TNavBarItem) {
  switch (data.hashTag) {
    case EItemHashTag.home: {
      router.push({ name: computedRoute.value['DashboardHome'] });
      break;
    }
    case EItemHashTag.account: {
      const isNotRoute =
        computedRoute.value['AccountMain'] === CouponRoutes.AccountMain;

      if (isNotRoute) {
        router.push('');
        handleAccountItemClick(computedRoute.value['AccountMain']);
        return;
      }

      router.push({ name: computedRoute.value['AccountMain'] });
      break;
    }
    case EItemHashTag.recipients: {
      router.push({ name: computedRoute.value['RecipientsLiber'] });
      break;
    }
    case EItemHashTag.gift: {
      router.push({ name: computedRoute.value['Invite'] });
      break;
    }
    default: {
      ('');
    }
  }
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

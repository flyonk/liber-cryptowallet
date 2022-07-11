<template name="BottomNav">
  <div class="bottom-nav">
    <!-- <ul class="navbar-list">
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
    </ul> -->
    <m-bottom-nav
      :nav-items="navItems"
      :main-item="mainItem"
      show-main-item
      :active-item="activeItem"
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
import { computed, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { Route } from '@/router/types';
import { CouponRoutes } from '@/applications/coupons/router/types';
import { useRouter } from 'vue-router';
import { MBottomNav } from '@liber-biz/crpw-ui-kit-liber';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NavBarItem } from '@/components/ui';
import BottomSwipeMenu from '@/components/ui/bottom-swipe-menu/BottomSwipeMenu.vue';

import { useUIStore } from '@/stores/ui';
const uiStore = useUIStore();

const { tm } = useI18n();

let isMenuOpen = computed(() => uiStore.getModalStates.sendMenu);

const route = useRouter();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const handleClick = (name: string) => {
  if (name === CouponRoutes.AccountMain) {
    openMenu();
    return false;
  }
};

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

const mainItem = ref({
  label: 'Send',
  isActive: false,
  iconSrc: require('@/assets/icon/navbar/send.svg'),
});

const activeItem = ref('');

const handleClickItem = (data: TNavBarItem) => {
  console.log('handleClickItem', data);
  activeItem.value = data.hashTag;

  switch (data.hashTag) {
    case EItemHashTag.home: {
      route.push({ name: computedRoute.value['DashboardHome'] });
      break;
    }
    case EItemHashTag.account: {
      route.push({ name: computedRoute.value['AccountMain'] });
      break;
    }
    case EItemHashTag.recipients: {
      route.push({ name: computedRoute.value['RecepientsPhone'] });
      break;
    }
    case EItemHashTag.gift: {
      route.push({ name: computedRoute.value['Invite'] });
      break;
    }
    default: {
      ('');
    }
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

<template name="DashboardHome">
  <div class="page-wrapper" :style="stylePaddings">
    <DashboardSkeleton v-if="loading" />
    <t-top-navigation
      v-show="!loading"
      nav-with-custom-top-left
      nav-without-title
    >
      <template #top-left>
        <div class="header">
          <div class="left">
            <img
              alt
              src="@/assets/images/avatar.png"
              @click="$router.push('/profile')"
            />
            <AKycStatusBadge
              class="status"
              :status="VerificationStatus"
              :title="$t('views.dashboard.home.idVerified')"
            />
          </div>
        </div>
      </template>
      <template #top-right>
        <div class="header">
          <div class="right">
            <i class="icon-bell notification ml-auto" />
            <img alt class="refresh ml-auto" src="@/assets/icon/refresh.svg" />
          </div>
        </div>
      </template>
      <template #title></template>
      <template #content>
        <div :style="stylePaddings">
          <ul class="tabs flex">
            <router-link
              v-for="tab in tabs"
              :key="tab.id"
              :to="tab.route"
              class="tab-item text--footnote"
            >
              {{ tab.name }}
            </router-link>
          </ul>

          <router-view />
        </div>
      </template>
    </t-top-navigation>
  </div>
</template>

<script lang="ts" setup>
import { computed, inject, ref } from 'vue';

import { useI18n } from 'vue-i18n';

import useSafeAreaPaddings from '@/helpers/safeArea';
import { EKYCStatuses } from '@/models/profile/profile';
import { useUIStore } from '@/stores/ui';
import { Route } from '@/router/types';
import { CouponRoutes } from '@/applications/coupons/router/types';
import { ServicesRoutes } from '@/applications/servicesapp/router/types';

import DashboardSkeleton from '@/components/ui/organisms/DashboardSkeleton.vue';
import { TTopNavigation } from '@/components/ui';

import { COUPONS_ENABLED } from '@/constants';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { AKycStatusBadge } = uiKit!;

const { tm } = useI18n();
const uiStore = useUIStore();

const VerificationStatus = ref(EKYCStatuses.success);

const { stylePaddings } = useSafeAreaPaddings();

const loading = computed(() => uiStore.getLoadingState.dashboard);

const tabs = [
  {
    id: 1,
    name: tm('views.dashboard.home.tabs.dashboard'),
    route: { name: Route.DashboardLiber },
  },
  {
    id: 3,
    name: tm('views.dashboard.home.tabs.services'),
    route: { name: ServicesRoutes.DashboardHome },
  },
];

if (COUPONS_ENABLED) {
  tabs.push({
    id: 2,
    name: tm('views.dashboard.home.tabs.coupons'),
    route: { name: CouponRoutes.DashboardHome },
  });
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  background-color: $color-light-grey-100;
  height: 100vh;
}

.tabs {
  margin-bottom: 24px;

  > .tab-item {
    color: $color-brand-primary;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 11px 16px;
  }
}

.router-link-exact-active {
  background: $color-brand-secondary;
  color: $color-white !important;
}

.header {
  > .left {
    display: flex;
    align-items: center;

    > .status {
      margin: 0 0 0 8px;
    }
  }

  > .right {
    > .notification {
      margin-right: 35px;
      font-size: 24px;
    }
  }
}
</style>

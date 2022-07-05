<template>
  <div class="dashboard-container">
    <h2 class="title text--footnote font-weight--semibold">
      {{ $t('views.dashboard.home.libersave.title') }}
    </h2>
    <ul>
      <template v-for="(item, index) in servicesItems" :key="index">
        <a-dashboard-service-item
          :title="item.title"
          :description="item.description"
          :image-url="item.imageUrl"
          :route-name="item.routeName"
        />
      </template>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { ADashboardServiceItem } from '@/applications/servicesapp/components/ui';
import { STATIC_BASE_URL } from '@/constants';
import { useI18n } from 'vue-i18n';
import { ServicesRoutes } from '@/applications/servicesapp/router/types';

const { tm } = useI18n();

const servicesItems = [
  {
    title: tm('services.banners.getcoupons'),
    description: tm('services.banners.howtogetcoupons'),
    imageUrl: `${STATIC_BASE_URL}/static/banner/subtract.svg`,
    routeName: ServicesRoutes.GetCouponsEmail,
  },
  {
    title: tm('services.banners.getcrypto'),
    description: tm('services.banners.howtogetcrypto'),
    imageUrl: `${STATIC_BASE_URL}/static/banner/subtract.svg`,
    routeName: ServicesRoutes.DashboardHome,
  },
];
</script>

<style lang="scss" scoped>
.dashboard-container {
  min-height: 100%;
}

.title {
  color: $color-dark-grey;
}
</style>

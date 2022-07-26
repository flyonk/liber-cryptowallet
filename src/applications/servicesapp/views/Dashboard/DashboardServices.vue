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

  <base-toast v-model:visible="showPopup" :severity="'confirmation'">
    <template #description>
      <div class="popup-description">
        <h1 class="title">{{ $t(popupTitle) }}</h1>
        <p class="description">
          {{ $t(popupDescription) }}
        </p>
      </div>
    </template>
  </base-toast>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import { useErrorsStore } from '@/stores/errors';
import { ADashboardServiceItem } from '@/applications/servicesapp/components/ui';
import { BaseToast } from '@/components/ui';
import { STATIC_BASE_URL } from '@/constants';
import { useI18n } from 'vue-i18n';
import { ServicesRoutes } from '@/applications/servicesapp/router/types';

const route = useRoute();
const { tm } = useI18n();
const errorsStore = useErrorsStore();
const showPopup = ref(false);
const popupTitle = ref('');
const popupDescription = ref('');

const { error, success } = route.query;

if (error) {
  switch (error) {
    case 'getcrypto':
      errorsStore.handle({
        err: { message: 'Get crytto by liber save' },
        name: 'getcrypto',
        ctx: 'convertFunds',
        description: "Error can't get crypto for liber save",
      });
      break;

    default:
      errorsStore.handle({
        err: { message: 'route error' },
        name: 'Dashboard Services route error',
        ctx: 'DashboardServices',
        description: 'Unknown error',
      });
      break;
  }
} else if (success) {
  switch (success) {
    case 'getcrypto':
      popupTitle.value = 'services.getcrypto.success';
      popupDescription.value = 'services.getcrypto.successDescription';
      break;

    default:
      popupTitle.value = 'services.convert.success';
      popupDescription.value = 'services.convert.successDescription';
      break;
  }
  showPopup.value = true;
}

const servicesItems = [
  {
    title: tm('services.banners.getcoupons'),
    description: tm('services.banners.howtogetcoupons'),
    imageUrl: `${STATIC_BASE_URL}/static/banner/subtract-white.svg`,
    routeName: ServicesRoutes.GetCouponsEmail,
  },
  {
    title: tm('services.banners.getcrypto'),
    description: tm('services.banners.howtogetcrypto'),
    imageUrl: `${STATIC_BASE_URL}/static/banner/subtract-rectangle.svg`,
    routeName: ServicesRoutes.GetCryptoCoin,
  },
];
</script>

<style lang="scss" scoped>
.dashboard-container {
  min-height: 100%;
}

.title {
  color: $color-dark-grey;
  margin-bottom: 15px;
}
</style>

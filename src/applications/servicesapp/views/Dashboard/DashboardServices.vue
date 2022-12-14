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

  <m-base-toast v-model:visible="showPopup" content-style="border-radius:32px;">
    <template #image>
      <div class="popup-image">
        <img
          :src="`${STATIC_BASE_URL}/static/media/confirmation.svg`"
          class="image"
        />
      </div>
    </template>
    <template #description>
      <div class="popup-description">
        <h1 class="title">{{ $t(popupTitle) }}</h1>
        <p class="description">
          {{ $t(popupDescription) }}
        </p>
      </div>
    </template>
  </m-base-toast>
</template>

<script lang="ts" setup>
import { ref, inject, computed } from 'vue';
import { useRoute } from 'vue-router';
import { useErrorsStore } from '@/stores/errors';
import { ADashboardServiceItem } from '@/applications/servicesapp/components/ui';
import { STATIC_BASE_URL } from '@/constants';
import { useI18n } from 'vue-i18n';
import { ServicesRoutes } from '@/applications/servicesapp/router/types';
import { uiKitKey } from '@/types/symbols';
import { useFundsStore } from '@/applications/servicesapp/stores/funds';

const uiKit = inject(uiKitKey);
const { MBaseToast } = uiKit!;

const route = useRoute();
const { tm } = useI18n();
const errorsStore = useErrorsStore();
const showPopup = ref(false);
const popupTitle = ref('');
const popupDescription = ref('');
const fundsStore = useFundsStore();

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

function getEmptyCoinImageSrc() {
  return `${STATIC_BASE_URL}/static/currencies/empty_token.svg`;
}

const emptyCryptoState = computed(() => {
  return {
    name: '---',
    code: 'empty',
    img: getEmptyCoinImageSrc(),
  };
});

fundsStore.setCrypto(emptyCryptoState.value, 'to');
</script>

<style lang="scss" scoped>
.dashboard-container {
  min-height: 100%;
  touch-action: none;
}

.title {
  color: $color-dark-grey;
  margin-bottom: 15px;
}

.popup-image {
  > .image {
    width: 50px;
    height: 50px;
  }
}
</style>

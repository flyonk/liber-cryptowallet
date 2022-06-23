<template>
  <div class="dashboard-container">
    <MDashboardCoinInfo
      :selected-account="selectedAccount"
      :accounts="accounts"
      :verification-status="10"
      class="coin-info"
    >
      <template #controllers>
        <div class="controls">
          <base-button
            v-for="({ icon, title }, index) in availableActionButtons"
            :key="index"
            view="finance-action"
            size="medium"
            :icon-left="icon"
          >
            {{ title }}
          </base-button>
          <base-button view="finance-action" size="medium"> ... </base-button>
        </div>
      </template>
    </MDashboardCoinInfo>

    <div class="transactions">
      <div class="header">
        <span class="title text--footnote font-weight--semibold">
          {{ $t('views.dashboard.home.transactions') }}
        </span>
        <base-button
          size="medium"
          view="flat"
          class="button"
          @click="$router.push({ name: CouponRoutes.CouponsTransactions })"
        >
          {{ $t('views.dashboard.home.seeAll') }}
        </base-button>
      </div>

      <transactions-list
        :preview="3"
        :transactions="transactions"
        transaction-type="coupons"
      />
    </div>

    <div class="dashboard-banner-container">
      <dashboard-banner
        v-for="(bannerItem, index) in bannerItems"
        :key="index"
        :title="bannerItem.title"
        :description="bannerItem.description"
        :image-url="bannerItem.imageUrl"
        :background-color="bannerItem.colors.background"
        :title-color="bannerItem.colors.title"
        :description-color="bannerItem.colors.description"
        :icon-color="bannerItem.colors.icon"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue';

import { useCouponsStore } from '@/applications/coupons/stores/coupons';
import { CouponRoutes } from '@/applications/coupons/router/types';
import { STATIC_BASE_URL } from '@/constants';
import { useI18n } from 'vue-i18n';
import { useUIStore } from '@/stores/ui';
import { useErrorsStore } from '@/stores/errors';

import {
  BaseButton,
  MDashboardCoinInfo,
  TransactionsList,
} from '@/components/ui';
import { DashboardBanner } from '@/applications/coupons/components/ui';

const couponsStore = useCouponsStore();
const uiStore = useUIStore();
const errorsStore = useErrorsStore();
const { tm } = useI18n();

const accounts = computed(() => couponsStore.getAccounts);
const transactions = computed(() => couponsStore.getTransactions);
const selectedAccount = ref({
  code: '',
  balance: '',
  imgSrc: '',
  baseBalanceConversion: '',
  baseBalanceConversionCode: '',
});
const bannerItems = ref([
  {
    title: tm('coupons.banners.recommend'),
    description: tm('coupons.banners.recommendDescription'),
    imageUrl: `${STATIC_BASE_URL}/static/banner/subtract.svg`,
    colors: {
      background: '#ECF9EE',
      title: '#3EAF4D',
      description: '#1D5124',
      icon: '#1D5124',
    },
  },
  {
    title: tm('coupons.banners.intro'),
    description: tm('coupons.banners.introDescription'),
    imageUrl: `${STATIC_BASE_URL}/static/banner/cpn.svg`,
    colors: {
      background: '#EBE4F9',
      title: '#050D1A',
      description: '#050D1A',
      icon: '#7E4FD1',
    },
  },
]);
const actionButtons = ref([
  {
    code: 'crypto_purchase',
    icon: 'icon-plus_circle',
    title: tm('transactions.operations.buy'),
  },
  {
    code: 'redemption',
    icon: 'icon-qr_code',
    title: tm('transactions.pay'),
  },
  {
    code: 'send',
    icon: '',
    title: tm('transactions.send'),
  },
]);

const availableActionButtons = computed(() => {
  return actionButtons.value.filter(
    ({ code }) => process.env.VUE_APP_COUPONS_TRANSACTIONS.search(code) >= 0
  );
});

onBeforeMount(async () => {
  try {
    uiStore.setLoadingState('dashboard', true);

    await Promise.all([
      couponsStore.setAccounts(),
      couponsStore.setTransactions(),
    ]);

    const [firstAccount] = accounts.value;

    selectedAccount.value = {
      code: firstAccount.code,
      balance: firstAccount.balance,
      imgSrc: firstAccount.imageUrl,
      baseBalanceConversion: firstAccount.baseBalanceConversion,
      baseBalanceConversionCode: firstAccount.baseBalanceConversionCode,
    };
  } catch (e) {
    await errorsStore.handle({
      err: e,
      name: 'DashboardCoupon',
      ctx: 'onMounted',
      description: 'Error receiving coupon data',
    });
  } finally {
    uiStore.setLoadingState('dashboard', false);
  }
});
</script>

<style lang="scss" scoped>
.coin-info {
  padding: 16px 10px;
  border-radius: 13px;
  background: $color-light-grey-400;
}

.controls {
  display: flex;

  > * {
    margin-right: 8px;
  }
}

.dashboard-container {
  min-height: 100%;

  > .transactions {
    margin: 22px 0 0;
    height: 100%;

    > .header {
      margin: 0 0 16px;
      display: flex;
      justify-content: space-between;

      > .title {
        color: $color-dark-grey;
      }

      > .button:deep {
        min-width: auto;
      }
    }
  }
}

.dashboard-banner-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-column-gap: 8px;
}
</style>

<template>
  <div class="dashboard-container">
    <MDashboardCoinInfo
      :selected-account="selectedAccount"
      :accounts="accounts"
      :verification-status="10"
      class="coin-info"
      @click-account="clickAccount"
    >
      <template #controllers>
        <div class="controls">
          <m-base-button
            v-for="({ icon, title }, index) in availableActionButtons"
            :key="index"
            view="finance-action"
            size="medium"
            :icon-left="icon"
          >
            {{ title }}
          </m-base-button>
          <m-base-button view="finance-action" size="medium">
            ...
          </m-base-button>
        </div>
      </template>
    </MDashboardCoinInfo>

    <div class="transactions">
      <div class="header">
        <span class="title text--footnote font-weight--semibold">
          {{ $t('views.dashboard.home.transactions') }}
        </span>
        <m-base-button
          size="medium"
          view="flat"
          class="button"
          @click="$router.push({ name: CouponRoutes.TransactionsAll })"
        >
          {{ $t('views.dashboard.home.seeAll') }}
        </m-base-button>
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
import { computed, defineAsyncComponent, onBeforeMount, ref } from 'vue';

import { useCouponsStore } from '@/applications/coupons/stores/coupons';
import { CouponRoutes } from '@/applications/coupons/router/types';
import { ECouponsTransactionsEnvVars } from '@/types/base-component';
import { STATIC_BASE_URL, COUPONS_TRANSACTIONS } from '@/constants';
import { useI18n } from 'vue-i18n';
import { useUIStore } from '@/stores/ui';
import { useErrorsStore } from '@/stores/errors';
// import { COUPON_ACCOUNTS } from '@/../tests/mock/couponAccounts';
import { useRouter } from 'vue-router';

import { MDashboardCoinInfo, TransactionsList } from '@/components/ui';
import { DashboardBanner } from '@/applications/coupons/components/ui';
const MBaseButton = defineAsyncComponent(() => {
  return import(`@liber-biz/crpw-ui-kit-${process.env.VUE_APP_BRAND}`).then(
    (lib) => lib.MBaseButton
  );
});

const couponsStore = useCouponsStore();
const uiStore = useUIStore();
const errorsStore = useErrorsStore();
const { tm } = useI18n();
const router = useRouter();

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
    code: ECouponsTransactionsEnvVars.purchase,
    icon: 'icon-plus_circle',
    title: tm('transactions.operations.coupons.buy'),
  },
  {
    code: ECouponsTransactionsEnvVars.redemption,
    icon: 'icon-qr_code',
    title: tm('transactions.operations.coupons.pay'),
  },
  {
    code: ECouponsTransactionsEnvVars.send,
    icon: '',
    title: tm('transactions.operations.coupons.send'),
  },
]);

const availableActionButtons = computed(() => {
  return actionButtons.value.filter(({ code }) =>
    COUPONS_TRANSACTIONS.includes(code)
  );
});

const clickAccount = () => {
  // router.push({
  //   name: CouponRoutes.CouponsTransactions,
  //   params: { id: COUPON_ACCOUNTS[0].id },
  // });
  router.push({
    name: CouponRoutes.TransactionsMain,
  });
};

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

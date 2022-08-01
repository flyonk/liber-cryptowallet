<template name="AccountDetail">
  <div class="account-transactions">
    <t-top-navigation
      nav-without-title
      @click:left-icon="$router.replace({ name: Route.AccountMain })"
    />
    <div class="header">
      <!--TODO: get this stuff from call-->
      <total-account-balance-by-coin
        :balance="balance.balance"
        :base-conversion-sum="balance.baseBalanceConversion"
        :coin-code="balance.name"
        :coin-icon-url="balance.imageUrl"
        :currency="balance.baseBalanceConversionCode"
      />
      <!--TODO: move to separated component-->
      <swiper class="swiper" :slides-per-view="3.5" :space-between="5">
        <swiper-slide
          v-for="(item, index) in carousel"
          :key="index"
          class="item-slide"
          @click="onClick(item)"
        >
          <img :src="item.img" alt class="image" />
          <p class="name">{{ item.name }}</p>
        </swiper-slide>
      </swiper>
      <div v-if="showControls" class="controls">
        <button class="btn">
          <img alt class="label" src="@/assets/icon/plus.svg" />{{
            $t('transactions.deposit')
          }}
        </button>
        <button class="btn">
          <img alt class="label" src="@/assets/icon/arrow-right-white.svg" />{{
            $t('transactions.send')
          }}
        </button>
        <button class="btn">
          <img alt="Exchange" class="label" src="@/assets/icon/repeat.svg" />{{
            $t('transactions.exchange')
          }}
        </button>
      </div>
      <div class="main-tabs">
        <div
          :class="{ active: activeTab === 1 }"
          class="tab"
          @click="activeTab = 1"
        >
          {{ $t('common.history') }}
        </div>
        <div
          :class="{ active: activeTab === 2 }"
          class="tab"
          @click="activeTab = 2"
        >
          {{ $t('transactions.walletAddress') }}
        </div>
      </div>

      <transactions-list
        v-if="activeTab === 1"
        :main-coin="currentCoin"
        :show-coin="false"
        :transactions="transactions"
        class="transactions-block"
      />

      <div v-if="activeTab === 2" class="wallet">
        <account-details :coin-code="route.params.coin || 'tbtc'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, Ref, ref } from 'vue';
import { LocaleMessageValue, useI18n, VueMessageType } from 'vue-i18n';
import { useRoute, useRouter } from 'vue-router';
import { Swiper, SwiperSlide } from 'swiper/vue';

import { Route } from '@/router/types';
import { EKYCStatus } from '@/models/profile/profile';
import { useAccountStore } from '@/applications/liber/stores/account';
import { useProfileStore } from '@/stores/profile';

// import TotalAccountBalanceByCoin from '@/components/ui/organisms/account/TotalAccountBalanceByCoin.vue';
import {
  AccountDetails,
  TotalAccountBalanceByCoin,
  TransactionsList,
  TTopNavigation,
} from '@/components/ui';
import { IAccount } from '@/applications/liber/models/account/account';

interface ICarouselItem {
  name: LocaleMessageValue<VueMessageType>;
  img: string;
  successRoute: string;
  failRoute: string;
  query?: { [key: string]: string };
  params?: { [key: string]: string };
}

let showControls = ref(false);
const { tm } = useI18n();

//TODO: write full name accountStore
const accountStore = useAccountStore();
const profileStore = useProfileStore();

const activeTab = ref(1);
const currentCoin = ref(null) as Ref<string | null>;

const route = useRoute();
const router = useRouter();

/**
 * Lifecycle
 */
const coin = ref('');

onBeforeMount(() => {
  if (route.params.coin) {
    coin.value = route.params.coin as string;

    accountStore.init(coin.value);
    currentCoin.value = coin.value;
  }

  profileStore.init();
});

const transactions = computed(() => accountStore.getCoinTransactions);
const balance = computed(() => accountStore.getBalanceByCoin);

const carousel: ICarouselItem[] = [
  {
    name: tm('transactions.carousel.deposit'),
    img: require('@/assets/icon/transactions/carousel/deposit.svg'),
    successRoute: Route.DepositNetwork,
    failRoute: Route.DashboardStory,
    query: { code: route.params.coin as string },
  },
  {
    name: tm('transactions.carousel.sendFunds'),
    img: require('@/assets/icon/transactions/carousel/send.svg'),
    successRoute: Route.PayRecipientsPhone,
    failRoute: Route.DashboardStory,
  },
  {
    name: tm('transactions.carousel.convert'),
    img: require('@/assets/icon/transactions/carousel/convert.svg'),
    successRoute: Route.ConvertFunds,
    failRoute: Route.DashboardStory,
    query: { code: route.params.coin as string },
  },
  {
    name: tm('transactions.carousel.withdraw'),
    img: require('@/assets/icon/transactions/carousel/send.svg'),
    successRoute: Route.Withdraw,
    params: { code: route.params.coin as string },
    failRoute: Route.DashboardStory,
  },
];

const onClick = (carouselItem: ICarouselItem) => {
  const { kycStatus } = profileStore.getUser;

  if (carouselItem.successRoute === Route.PayRecipientsPhone) {
    const accountToSend: IAccount | undefined = accountStore.getAccounts.find(
      ({ code }) => code === route.params.coin
    );

    accountStore.accountToSend = accountToSend ? accountToSend : null;
  }

  switch (kycStatus) {
    case EKYCStatus.success:
      if (carouselItem.query) {
        router.push({
          name: carouselItem.successRoute,
          query: carouselItem.query,
        });
        return;
      }

      if (carouselItem.params) {
        router.push({
          name: carouselItem.successRoute,
          params: carouselItem.params,
        });
        return;
      }

      router.push({
        name: carouselItem.successRoute,
      });
      break;
    case EKYCStatus.not_started:
      break;
    case EKYCStatus.pending:
      break;
    case EKYCStatus.rejected:
      break;
    default:
      router.push({
        name: carouselItem.failRoute,
      });
      break;
  }
};
</script>

<style lang="scss" scoped>
.account-transactions {
  background: $color-light-grey-100;
  height: calc(100% - 95px);
  overflow: scroll;
  flex-grow: 1;

  > .header {
    padding: 0 16px;

    > .swiper {
      overflow: visible;
    }

    > .controls {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin-bottom: 32px;

      > .btn {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 109px;
        height: 40px;
        background: $color-primary;
        color: $color-white;
        border-radius: 10px;

        > .label {
          margin-right: 9px;
        }
      }
    }
  }
}

.main-tabs {
  display: flex;
  justify-content: center;
  width: 100%;
  padding: 4px;
  border-radius: 8px;
  background: $color-light-grey;
  margin-bottom: 30px;
  margin-top: 24px;

  > .tab {
    width: 49%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: $color-dark-grey;
    height: 32px;
    background: $color-light-grey;
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
  }

  > .active {
    background: $color-white;
    color: $color-brand-secondary;
  }
}

.transactions-block {
  height: auto;
  margin-bottom: 0;
  padding-bottom: 10%;
}

.title-currency {
  & > .currency {
    font-weight: 600;
    font-size: 22px;
    line-height: 34px;
    letter-spacing: -0.0026em;
  }
}

.item-slide {
  width: 104px;
  height: 104px;
  padding: 12px;
  background: $color-white;
  border: 1px solid #eef0fb;
  box-shadow: 0 4px 12px -8px $carousel-item-shadow;
  border-radius: 8px;
  margin-right: 5px;

  > .image {
    margin-bottom: 8px;

    &:last-child {
      transform: rotate(-90deg);
    }
  }

  > .name {
    font-weight: 600;
    font-size: 12px;
    line-height: 16px;
    color: $color-brand-primary;
  }
}

.crypto-number {
  > .text {
    font-size: 16px;
    line-height: 21px;
    letter-spacing: -0.0031em;
    color: $color-black;

    > .bold {
      font-weight: bold;
    }
  }
}

.wallet-address {
  width: 100%;
  background: $color-white;
  box-shadow: 0 0 24px rgb(64 70 105 / 8%);
  padding: 34px 32px 50px;

  > .title {
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.0008em;
    color: $color-dark-grey;
    margin-bottom: 4px;
  }

  > .account {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  > .bluetitle {
    font-weight: 600;
    font-size: 17px;
    line-height: 22px;
    letter-spacing: -0.0043em;
    color: $color-primary;
    text-shadow: 0 1px 2px rgb(0 0 0 / 4%);
    margin-bottom: 43px;
  }

  > .controls {
    display: flex;

    > .btn {
      width: 166px;
      height: 48px;
      background: $color-light-grey;
      border-radius: 13px;
      font-weight: 600;
      font-size: 17px;

      &:first-child {
        margin-right: 12px;
        color: $color-primary;
        text-shadow: 0 1px 2px rgb(0 0 0 / 4%);
      }

      &:last-child {
        background: $color-primary;
        color: $color-white;
      }
    }
  }
}

:deep(.agile) {
  height: 115px;

  > .agile__list {
    height: 100%;
  }
}
</style>

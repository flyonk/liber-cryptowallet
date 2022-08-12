<template>
  <div class="coupons-transactions">
    <div class="header">
      <t-top-navigation nav-without-title @click:left-icon="router.go(-1)" />
      <!-- temporary mock data inside -->
      <total-account-balance-by-coin
        balance="1,234"
        base-conversion-sum="75.20"
        coin-code="CPN"
        :coin-icon-url="`${STATIC_BASE_URL}/static/banner/cpn.svg`"
        currency="€"
      />
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
    </div>
    <div class="flex flex-column">
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
      <ul
        v-if="activeTab === 1"
        ref="dashboardTransactions"
        class="transactions-list"
      >
        <li
          v-for="(transaction, index) in MOCK_COUPONS_TRANSACTIONS"
          :key="index"
          class="item"
        >
          <img :src="transaction.img" class="icon" />
          <div class="info">
            <div class="flex">
              <h1 class="title">{{ transaction.info }}</h1>
              <p :class="{ received: transaction.sum.startsWith('+') }">
                {{ transaction.sum }}
              </p>
            </div>
            <div class="flex">
              <div class="subtitle">{{ transaction.from }}</div>
              <div
                v-if="transaction.status"
                :class="{ pending: transaction.status === 'Pending' }"
                class="flex"
              >
                <i class="icon-clock mr-1" />
                <p>
                  {{ transaction.status }}
                </p>
              </div>
              <p v-else class="sum">{{ transaction.sum }}</p>
            </div>
          </div>
        </li>
      </ul>

      <div v-if="activeTab === 2" class="wallet">
        <img alt="qr-code" class="qr mb-4" src="@/assets/images/qr-code.png" />
        <div class="wallet-address">
          <h4 class="title">
            {{ $t('transactions.walletAddress') }}
          </h4>
          <div class="account">
            <div class="crypto-number">
              <p class="text">
                {{ wallet }}
                <br />sd21213
                <span class="bold">Opa139z0l</span>
              </p>
            </div>
            <img alt="folders" src="@/assets/icon/folders.svg" />
          </div>
          <h2 class="bluetitle">
            {{ $t('transactions.generateAddress') }}
          </h2>
          <div class="controls">
            <button class="btn">
              {{ $t('common.saveImage') }}
            </button>
            <button class="btn" @click="shareAddress">
              {{ $t('transactions.shareAddress') }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';

import { STATIC_BASE_URL } from '@/constants';
import { useI18n, LocaleMessageValue, VueMessageType } from 'vue-i18n';
import { Route } from '@/router/types';
import { useRoute, useRouter } from 'vue-router';

import { TTopNavigation, TotalAccountBalanceByCoin } from '@/components/ui';

interface ICarouselItem {
  name: LocaleMessageValue<VueMessageType>;
  img: string;
  successRoute: string;
  failRoute: string;
  query?: { [key: string]: string };
  params?: { [key: string]: string };
}

const { tm } = useI18n();
const route = useRoute();
const router = useRouter();

const activeTab = ref(1);

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
    successRoute: Route.PayRecipientsLiber,
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

//temporary data for markup before real API
const MOCK_COUPONS_TRANSACTIONS = [
  {
    info: `${tm('transactions.operations.received')} USDT`,
    from: `${tm('common.from')} andrew@gmail.com`,
    sum: '+ 0.0001 BTC',
    status: 'Pending',
    img: `${STATIC_BASE_URL}/static/transactions/received.svg`,
  },
  {
    info: `${tm('transactions.operations.deposit')} BTC`,
    from: `${tm('common.from')} Bitcoin address`,
    sum: '+ 0.0001 BTC',
    img: `${STATIC_BASE_URL}/static/transactions/sent.svg`,
  },
  {
    info: `${tm('transactions.operations.sent')} USDT`,
    from: `${tm('common.to')} andrew@gmail.com`,
    sum: '- 13.55 USDT',
    img: `${STATIC_BASE_URL}/static/transactions/exchange.svg`,
  },
  {
    info: `${tm('transactions.operations.received')} USDT`,
    from: `${tm('common.from')} andrew@gmail.com`,
    sum: '+ 13.55 USDT',
    status: tm('transactions.operations.pending'),
    img: `${STATIC_BASE_URL}/static/transactions/received.svg`,
  },
  {
    info: `${tm('transactions.operations.deposit')} USDT`,
    from: `${tm('common.from')} Bitcoin address`,
    sum: '+ 125.00 USDT',
    img: `${STATIC_BASE_URL}/static/transactions/sent.svg`,
  },
  {
    info: `${tm('transactions.operations.sent')} USDT`,
    from: `${tm('common.from')} andrew@gmail.com`,
    sum: '- 13.55 USDT',
    img: `${STATIC_BASE_URL}/static/transactions/exchange.svg`,
  },
];
</script>

<style lang="scss" scoped>
.coupons-transactions {
  background: $color-light-grey-100;
  height: 100vh;
  flex-grow: 1;
  overflow: hidden;

  > .header {
    padding: 0 16px;
    margin-bottom: 24px;

    > .swiper {
      overflow: visible;
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

.transactions-list {
  overflow: auto;
  padding-right: 10px;
  flex-grow: 1;

  > .item {
    display: flex;
    width: 100%;
    margin-bottom: 24px;

    > .icon {
      margin-right: 12px;
      width: 40px;
      height: 40px;
    }

    > .info {
      width: 100%;

      > .flex {
        width: 100%;
        justify-content: space-between;

        > .title {
          font-weight: 500;
          font-size: 16px;
          line-height: 21px;
          letter-spacing: -0.0031em;
        }

        > .subtitle {
          font-size: 13px;
          line-height: 18px;
          letter-spacing: -0.0008em;
          color: $color-dark-grey;
        }

        > .pending {
          color: $color-yellow-600;
        }

        > .received {
          color: $color-green-600;
        }

        > .sum {
          font-size: 13px;
          line-height: 18px;
          text-align: right;
          letter-spacing: -0.0008em;
          color: $color-dark-grey;
        }
      }
    }
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

.wallet {
  display: flex;
  flex-direction: column;
  align-items: center;
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
</style>

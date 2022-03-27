<template name="AccountDetail">
  <div class="account-transactions">
    <div class="header">
      <img
        alt="arrow-left"
        class="back"
        src="@/assets/icon/arrow-left.svg"
        @click="$router.push({ name: Route.AccountMain })"
      />
      <!--TODO: get this stuff from call-->
      <total-account-balance-by-coin
        :balance="balance.balance"
        :base-conversion-sum="balance.baseBalanceConversion"
        :coin-code="balance.name"
        :currency="balance.baseBalanceConversionCode"
      />
      <!--TODO: move to separated component-->
      <VueAgile
        :nav-buttons="false"
        :slides-to-show="2"
        class="carousel-slider"
      >
        <div
          v-for="(item, index) in carousel"
          :key="index"
          class="item-slide"
          @click="$router.push('/home/story')"
        >
          <img :src="item.img" class="image" />
          <p class="name">{{ item.name }}</p>
        </div>
      </VueAgile>
      <div v-if="showControls" class="controls">
        <button class="btn">
          <img class="label" src="@/assets/icon/plus.svg" />{{
            $t('transactions.deposit')
          }}
        </button>
        <button class="btn">
          <img class="label" src="@/assets/icon/arrow-right-white.svg" />{{
            $t('transactions.send')
          }}
        </button>
        <button class="btn">
          <img class="label" src="@/assets/icon/repeat.svg" />{{
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

      <div v-if="activeTab === 1">
        <transactions-list :transactions="transactions" />
      </div>

      <div v-if="activeTab === 2" class="wallet">
        <account-details :coin-code="route.params.coin || 'tbtc'" />
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';
import { VueAgile } from 'vue-agile';
import { useI18n } from 'vue-i18n';
import { useRoute } from 'vue-router';

import { Route } from '@/router/types';
import { useAccountStore } from '@/stores/account';

import TotalAccountBalanceByCoin from '@/components/ui/organisms/account/TotalAccountBalanceByCoin.vue';
import TransactionsList from '@/components/ui/organisms/transactions/TransactionsList.vue';
import { AccountDetails } from '@/components/ui';

let showControls = ref(false);
const { tm } = useI18n();

//TODO: write full name accountStore
const aStore = useAccountStore();

const activeTab = ref(1);

const route = useRoute();

/**
 * Lifecycle
 */
onMounted(() => {
  if (route.params.coin) aStore.init(route.params.coin as string);
});

const transactions = computed(() => aStore.getCoinTransactions);
const balance = computed(() => aStore.getBalanceByCoin);

const carousel = [
  {
    name: tm('transactions.carousel.deposit'),
    img: require('@/assets/icon/transactions/carousel/deposit.svg'),
  },
  {
    name: tm('transactions.carousel.sendFunds'),
    img: require('@/assets/icon/transactions/carousel/send.svg'),
  },
  {
    name: tm('transactions.carousel.convert'),
    img: require('@/assets/icon/transactions/carousel/convert.svg'),
  },
  {
    name: tm('transactions.carousel.withdraw'),
    img: require('@/assets/icon/transactions/carousel/send.svg'),
  },
];
</script>

<style lang="scss" scoped>
.account-transactions {
  background: $color-light-grey-100;
  height: 85%;
  padding: 35px 0 0;
  overflow-x: hidden;
  overflow-y: auto;
  flex-grow: 1;

  > .header {
    padding: 0 16px;

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

  > .wallet {
    display: flex;
    height: 370px;
    flex-direction: column;
    align-items: center;
    padding-top: 24px;

    > .qr {
      margin-bottom: 56px;
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

.title-currency {
  & > .currency {
    font-weight: 600;
    font-size: 22px;
    line-height: 34px;
    letter-spacing: -0.0026em;
  }
}

.carousel-slider {
  margin-bottom: 24px;
}

.item-slide {
  width: 104px;
  height: 104px;
  padding: 12px;
  background: $color-white;
  box-shadow: 0 2px 24px -12px rgb(0 0 0 / 34%);
  border-radius: 13px;
  margin-left: 5px;

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
</style>

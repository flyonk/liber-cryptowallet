<template name="AllAccounts">
  <div class="all-accounts">
    <div class="header">
      <img
        class="back"
        src="@/assets/icon/arrow-left.svg"
        alt="arrow-left"
        @click="$router.back()"
      />
      <img
        class="add"
        src="@/assets/icon/circle-add.svg"
        alt="circle-add"
        @click="
          $router.push({
            name: 'deposit-coin',
          })
        "
      />
    </div>
    <h1 class="title">{{ $t('views.account.allAccounts') }}</h1>
    <ul class="currencies">
      <li
        v-for="(currency, index) in currencies"
        :key="index"
        class="item"
        @click="$router.push(getCurrencyUrl(currency.code))"
      >
        <img v-if="currency.img !== ''" class="icon" :src="currency.img" alt />
        <h4 class="title">{{ currency.name }}</h4>
        <p class="description">{{ currency.description }}</p>
        <h5 class="sum">{{ currency.sum }}</h5>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

import { Route } from '@/router/types';

const { tm } = useI18n();

function getCurrencyUrl(code: string): string {
  //TODO: define logic with backend
  return code === 'eur' ? Route.DashboardHome : `/${Route.Account}/${code}`;
}

//TODO: get from API call if
const currencies = [
  {
    name: 'EUR',
    code: 'eur',
    description: tm('views.account.allAccounts'),
    sum: '€ 46.00',
    img: require('@/assets/icon/currencies/euro.svg'),
  },
  {
    name: 'BTC',
    code: 'tbtc',
    description: 'Bitcoin',
    sum: '0.001',
    img: require('@/assets/icon/currencies/btc.svg'),
  },
  {
    name: 'USDT',
    code: 'usdt',
    description: 'Teather USDT',
    sum: '0',
    img: require('@/assets/icon/currencies/tether.svg'),
  },
  {
    name: 'Hush',
    code: 'hush',
    description: 'Hush',
    sum: '0',
    img: require('@/assets/icon/currencies/hush.svg'),
  },
  {
    name: 'XRP',
    code: 'xrp',
    description: 'Ripple XRP',
    sum: '0',
    img: require('@/assets/icon/currencies/xrp.svg'),
  },
];
</script>

<style lang="scss" scoped>
.all-accounts {
  height: 100%;
  padding: 60px 16px 0;
  flex-grow: 1;
  overflow: auto;

  > .header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }

  > .title {
    font-weight: 800;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: 0.0038em;
    margin-bottom: 24px;
  }

  > .currencies {
    display: flex;
    flex-wrap: wrap;

    > .item {
      display: flex;
      flex-direction: column;
      margin: 0 7px 7px 0;
      padding: 16px;
      background: $color-light-grey;
      border-radius: 16px;
      height: 164px;
      width: 164px;

      > .icon {
        margin-bottom: 25px;
        height: 28px;
        width: 28px;
      }

      > .title {
        font-weight: 600;
        font-size: 16px;
        line-height: 21px;
        letter-spacing: -0.0031em;
        margin-bottom: 1px;
      }

      > .description {
        font-weight: 500;
        font-size: 13px;
        line-height: 18px;
        letter-spacing: -0.0008em;
        margin-bottom: 8px;
        color: $color-brand-300;
      }

      > .sum {
        font-weight: 600;
        font-size: 16px;
        line-height: 21px;
        letter-spacing: -0.0031em;
      }
    }
  }
}
</style>

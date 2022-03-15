<template name="DepositeSelectCoin">
  <div class="page-wrapper">
    <div class="page-header">
      <BackHistoryBtn :path="'/home'" />

      <h1 class="main-title">
        {{ $t('views.deposit.selectCoin.selectCoin') }}
      </h1>

      <label for="searchCoin" class="input-label">
        <img src="@/assets/icon/search.svg" alt="search" class="icon" />
        <input
          class="search"
          type="text"
          name="searchCoin"
          :placeholder="$t('views.deposit.selectCoin.searchCoin')"
        />
      </label>
    </div>
    <div class="page-main">
      <h4 class="title">{{ $t('views.deposit.selectCoin.suggested') }}</h4>
      <ul class="coin-list suggested">
        <CoinItem
          v-for="item in suggestedCoins"
          :key="item.id"
          :icon="item.icon"
          :full-name="item.fullName"
          :short-name="item.shortName"
          @click="selectCoin(item)"
        />
      </ul>
      <h4 class="title">{{ $t('views.deposit.selectCoin.allCoins') }}</h4>
      <ul class="coin-list all-coins">
        <CoinItem
          v-for="item in otherCoins"
          :key="item.id"
          :icon="item.icon"
          :full-name="item.fullName"
          :short-name="item.shortName"
          @click="selectCoin(item)"
        />
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

import BackHistoryBtn from '@/components/UI/atoms/BackHistoryBtn.vue';
import CoinItem from './CoinItem.vue';

const router = useRouter();
const coins = ref([]);

coins.value = [
  {
    id: 'bitcoin',
    icon: require('@/assets/icon/currencies/btc.svg'),
    fullName: 'Bitcoin',
    shortName: 'BTC',
  },
  {
    id: 'ethereum',
    icon: require('@/assets/icon/currencies/eth.svg'),
    fullName: 'ethereum',
    shortName: 'ETH',
  },
  {
    id: 'binance',
    icon: require('@/assets/icon/currencies/binance.svg'),
    fullName: 'Binance',
    shortName: 'BNB',
  },
  {
    id: 'dash',
    icon: require('@/assets/icon/currencies/dash.svg'),
    fullName: 'Dash',
    shortName: 'DSH',
  },
  {
    id: 'xrp',
    icon: require('@/assets/icon/currencies/xrp.svg'),
    fullName: 'Ripple',
    shortName: 'XRP',
  },
  {
    id: 'ftn',
    icon: require('@/assets/icon/currencies/fantom.svg'),
    fullName: 'Fantom',
    shortName: 'FTN',
  },
  {
    id: 'tron',
    icon: require('@/assets/icon/currencies/tron.svg'),
    fullName: 'Tron',
    shortName: 'TRX',
  },
  {
    id: 'graph',
    icon: require('@/assets/icon/currencies/graph.svg'),
    fullName: 'Graph',
    shortName: 'GRT',
  },
];

const suggestedCoins = ref(coins.value.slice(0, 3));
const otherCoins = ref(coins.value.length > 3 ? coins.value.slice(3) : []);

const selectCoin = (coin) => {
  console.log('selected coin', coin);
  router.push({
    name: 'deposit-network',
  });
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  margin: 15px;
  flex-grow: 1;
}

.main-title {
  font-style: normal;
  font-weight: 800;
  font-size: 28px;
  line-height: 34px;
  letter-spacing: 0.0038em;
  margin-bottom: 10px;
  margin-top: 20px;
}

.page-header {
  margin-bottom: 32px;
}

.input-label {
  position: relative;
  display: block;
  overflow: hidden;
  border-radius: 12px;

  > .search {
    background: $color-light-grey;
    color: $color-dark-grey;
    width: 100%;
    height: 44px;
    padding-left: 40px;
    font-size: 16px;
    line-height: 21px;
    align-items: center;
    letter-spacing: -0.0031em;
    border: 0;
    outline: none;
  }

  > .icon {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
  }
}

.page-main {
  > .title {
    font-weight: 500;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.0008em;
    color: $color-brand-primary;
    margin-bottom: 16px;
  }
}

.coin-list {
  margin-bottom: 40px;
}
</style>

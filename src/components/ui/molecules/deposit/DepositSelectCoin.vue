<template name="DepositeSelectCoin">
  <div class="select-coin">
    <h4 class="title">{{ $t('views.deposit.selectCoin.suggested') }}</h4>
    <ul class="coin-list suggested">
      <CoinItem
        v-for="item in suggestedCoins"
        :key="item.id"
        :avaliable="!item.avaliable"
        :full-name="item.name"
        :icon="item.icon"
        @click="$emit('select-coin', item)"
      />
    </ul>
    <h4 class="title">{{ $t('views.deposit.selectCoin.allCoins') }}</h4>
    <ul class="coin-list all-coins">
      <CoinItem
        v-for="item in otherCoins"
        :key="item.id"
        :avaliable="!item.avaliable"
        :full-name="item.name"
        :icon="item.icon"
        :short-name="item.code"
        @click="$emit('select-coin', item)"
      />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { Ref, ref } from 'vue';

import { ICryptocurrencyItem } from '@/types/currency';

import CoinItem from '@/components/ui/atoms/coins/СoinItem.vue';

const coins = ref([]) as Ref<ICryptocurrencyItem[]>;

defineEmits(['select-coin']);

coins.value = [
  {
    id: 'bitcoin',
    icon: require('@/assets/icon/currencies/btc.svg'),
    name: 'Bitcoin',
    code: 'btc',
    avaliable: true,
  },
  {
    id: 'ethereum',
    icon: require('@/assets/icon/currencies/eth.svg'),
    name: 'Ethereum',
    code: 'eth',
    avaliable: true,
  },
  {
    id: 'usdt',
    icon: require('@/assets/icon/currencies/tether.svg'),
    name: 'Tether',
    code: 'USDT',
    avaliable: true,
  },
  {
    id: 'binance',
    icon: require('@/assets/icon/currencies/binance.svg'),
    name: 'Binance',
    code: 'bnb',
    avaliable: false,
  },
  {
    id: 'dash',
    icon: require('@/assets/icon/currencies/dash.svg'),
    name: 'Dash',
    code: 'dsh',
    avaliable: false,
  },
  {
    id: 'xrp',
    icon: require('@/assets/icon/currencies/xrp.svg'),
    name: 'Ripple',
    code: 'xrp',
    avaliable: false,
  },
  {
    id: 'ftn',
    icon: require('@/assets/icon/currencies/fantom.svg'),
    name: 'Fantom',
    code: 'ftn',
    avaliable: false,
  },
  {
    id: 'tron',
    icon: require('@/assets/icon/currencies/tron.svg'),
    name: 'Tron',
    code: 'trx',
    avaliable: false,
  },
  {
    id: 'graph',
    icon: require('@/assets/icon/currencies/graph.svg'),
    name: 'Graph',
    code: 'grt',
    avaliable: false,
  },
];

const suggestedCoins = ref(coins.value.slice(0, 3));
const otherCoins = ref(coins.value.length > 3 ? coins.value.slice(3) : []);
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

.select-coin {
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

<template name="DepositeSelectCoin">
  <div class="page-wrapper add-account">
    <div class="page-header">
      <BackHistoryBtn />

      <h1 class="main-title">
        Select a coin
      </h1>

      <label
        for="searchCoin"
        class="input-label"
      >
        <img
          src="@/assets/icon/search.svg"
          alt="search"
          class="icon"
        >
        <input
          class="search"
          type="text"
          placeholder="Search a coin"
          name="searchCoin"
        >
      </label>
    </div>
    <div class="main">
      <h4 class="title">
        Suggested
      </h4>
      <ul class="coin-list suggested">
        <CoinItem
          v-for="item in suggestedCoins"
          :key="item.id"
          :icon="item.icon"
          :fullName="item.fullName"
          :shortName="item.shortName"
        />
      </ul>
      <h4 class="title">
        All Coins
      </h4>
      <ul class="coin-list all-coins">
        <CoinItem
          v-for="item in otherCoins"
          :key="item.id"
          :icon="item.icon"
          :fullName="item.fullName"
          :shortName="item.shortName"
        />
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import BackHistoryBtn from '@/components/UI/BackHistoryBtn.vue'
import CoinItem from './CoinItem.vue'
import { ref } from 'vue'

const coins = ref([])

coins.value = [
  {
    id: 'bitcoin',
    icon: require('@/assets/icon/currencies/btc.svg'),
    fullName: 'Bitcoin',
    shortName: 'BTC'
  },
  {
    id: 'ethereum',
    icon: require('@/assets/icon/currencies/eth.svg'),
    fullName: 'ethereum',
    shortName: 'ETH'
  },
  {
    id: 'binance',
    icon: require('@/assets/icon/currencies/binance.svg'),
    fullName: 'Binance',
    shortName: 'BNB'
  },
  {
    id: 'dash',
    icon: require('@/assets/icon/currencies/dash.svg'),
    fullName: 'Dash',
    shortName: 'DSH'
  },
  {
    id: 'xrp',
    icon: require('@/assets/icon/currencies/xrp.svg'),
    fullName: 'Ripple',
    shortName: 'XRP'
  },
  {
    id: 'ftn',
    icon: require('@/assets/icon/currencies/fantom.svg'),
    fullName: 'Fantom',
    shortName: 'FTN'
  },
  {
    id: 'tron',
    icon: require('@/assets/icon/currencies/tron.svg'),
    fullName: 'Tron',
    shortName: 'TRX'
  },
  {
    id: 'graph',
    icon: require('@/assets/icon/currencies/graph.svg'),
    fullName: 'Graph',
    shortName: 'GRT'
  },
]

const suggestedCoins = ref(coins.value.slice(0, 3))
const otherCoins = ref(coins.value.length > 3 ? coins.value.slice(3) : [])

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
  >.search {
    background: #EDF0FB;
    border-radius: 12px;
    width: 100%;
    height: 44px;
    padding-left: 40px;
    font-size: 16px;
    line-height: 21px;
    display: flex;
    align-items: center;
    letter-spacing: -0.0031em;
    color: #78809B;
    border: 0;
    outline: none;

  }

  >.icon {
    position: absolute;
    top: 10px;
    left: 10px;
    z-index: 1;
  }
}
.add-account {
  >.main {
    >.title {
      font-weight: 500;
      font-size: 13px;
      line-height: 18px;
      letter-spacing: -0.0008em;
      color: #0D1F3C;
      margin-bottom: 16px;
    }

    >.coin-list {
      margin-bottom: 40px;

      >.item {
        display: flex;
        align-items: center;
        margin-bottom: 24px;

        >.img {
          margin-right: 16px;
        }

        >.name {
          font-weight: 500;
          font-size: 17px;
          line-height: 22px;
          letter-spacing: -0.0043em;

          span {
            color: #AFB3C3;
            padding-left: 14px;
          }
        }
      }
    }
  }
}

</style>
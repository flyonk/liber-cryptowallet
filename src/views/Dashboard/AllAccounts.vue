<template name="AllAccounts">
  <div class="all-accounts">
    <div class="all-accounts__header">
      <img
        class="back"
        src="@/assets/icon/arrow-left.svg"
        alt="arrow-left"
        @click="$router.push('/home')"
      >
      <img
        class="add"
        src="@/assets/icon/circle-add.svg"
        alt="circle-add"
      >
    </div>
    <h1 class="title">
      All Accounts
    </h1>
    <ul class="currencies">
      <li
        v-for="(currency, index) in currencies"
        :key="index"
        class="item"
      >
        <img
          v-if="currency.img !== ''"
          class="icon"
          :src="currency.img"
          alt=""
        >
        <h4 class="title">
          {{ currency.name }}
        </h4>
        <p class="description">
          {{ currency.description }}
        </p>
        <h5 class="sum">
          {{ currency.sum }}
        </h5>
      </li>
    </ul>
    <BottomNav />
  </div>
</template>

<script setup lang="ts">
import BottomNav from '@/components/UI/BottomNav.vue'

const currencies = [
  {
    name: "EUR",
    description: "All Accounts",
    sum: "€1025.50",
    img: require('@/assets/icon/currencies/euro.svg')
  },
  {
    name: "BTC",
    description: "Bitcoin",
    sum: "0.00369879",
    img: require('@/assets/icon/currencies/btc.svg')
  },
  {
    name: "USDT",
    description: "Teather USDT",
    sum: "300.0305152",
    img: require('@/assets/icon/currencies/tether.svg')
  },
  {
    name: "Hush",
    description: "Hush",
    sum: "156.34569879",
    img: require('@/assets/icon/currencies/hush.svg')
  },
  {
    name: "XRP",
    description: "Ripple XRP",
    sum: "€1025.50",
    img: require('@/assets/icon/currencies/xrp.svg')
  }
]
</script>

<style lang="scss" scoped>
.all-accounts {
  height: 100%;
  padding: 60px 16px 0 16px;

  &__header {
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
      background: #EDF0FB;
      border-radius: 16px;
      height: 164px;
      width: 164px;

      >.icon {
        margin-bottom: 25px;
        height: 28px;
        width: 28px;
      }

      >.title {
        font-weight: 600;
        font-size: 16px;
        line-height: 21px;
        letter-spacing: -0.0031em;
        margin-bottom: 1px;
      }

      >.description {
        font-weight: 500;
        font-size: 13px;
        line-height: 18px;
        letter-spacing: -0.0008em;
        margin-bottom: 8px;
        color: #5C697D;
      }

      >.sum {
        font-weight: 600;
        font-size: 16px;
        line-height: 21px;
        letter-spacing: -0.0031em;
      }
    }
  }

}
</style>
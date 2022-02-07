<template name="AddAccount">
  <div class="add-account">
    <div class="header">
      <img
        class="back"
        src="@/assets/icon/arrow-left.svg"
        alt="arrow-left"
        @click="$router.push('/account')"
      >
      <h1 class="title">
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
        <li class="item">
          <img
            class="img"
            src="@/assets/icon/currencies/btc.svg"
            alt=""
          >
          <p class="name">
            Bitcoin <span>BTC</span>
          </p>
        </li>
        <li class="item">
          <img
            class="img"
            src="@/assets/icon/currencies/eth.svg"
            alt=""
          >
          <p class="name">
            Ethereum <span>ETH</span>
          </p>
        </li>
        <li class="item">
          <img
            class="img"
            src="@/assets/icon/currencies/binance.svg"
            alt=""
          >
          <p class="name">
            Binance <span>BNB</span>
          </p>
        </li>
      </ul>
      <h4 class="title">
        All Coins
      </h4>
      <ul class="coin-list all-coins">
        <li class="item">
          <img
            class="img"
            src="@/assets/icon/currencies/dash.svg"
            alt=""
          >
          <p class="name">
            Dash <span>DSH</span>
          </p>
        </li>
        <li class="item">
          <img
            class="img"
            src="@/assets/icon/currencies/xrp.svg"
            alt=""
          >
          <p class="name">
            Ripple <span>XRP</span>
          </p>
        </li>
        <li class="item">
          <img
            class="img"
            src="@/assets/icon/currencies/fantom.svg"
            alt=""
          >
          <p class="name">
            Fantom <span>FTN</span>
          </p>
        </li>
        <li class="item">
          <img
            class="img"
            src="@/assets/icon/currencies/tron.svg"
            alt=""
          >
          <p class="name">
            Tron <span>TRX</span>
          </p>
        </li>
        <li class="item">
          <img
            class="img"
            src="@/assets/icon/currencies/graph.svg"
            alt=""
          >
          <p class="name">
            Graph <span>GRT</span>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
// import { ref } from 'vue'
</script>

<style lang="scss" scoped>
.add-account {
  background: $color-light-grey-100;
  height: 100%;
  padding: 35px 16px 0;
  overflow-x: hidden;
  overflow-y: auto;
  flex-grow: 1;

  > .header {
    margin-bottom: 32px;

    > .back {
      margin-bottom: 20px;
    }

    > .title {
      font-weight: 800;
      font-size: 28px;
      line-height: 34px;
      letter-spacing: 0.0038em;
      margin-bottom: 16px;
    }

    > .input-label {
      position: relative;

      > .search {
        background: $color-light-grey;
        border-radius: 12px;
        width: 100%;
        height: 44px;
        padding-left: 40px;
        font-size: 16px;
        line-height: 21px;
        display: flex;
        align-items: center;
        letter-spacing: -0.0031em;
        color: $color-dark-grey;
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
  }

  > .main {
    > .title {
      font-weight: 500;
      font-size: 13px;
      line-height: 18px;
      letter-spacing: -0.0008em;
      color: $color-brand;
      margin-bottom: 16px;
    }

    > .coin-list {
      margin-bottom: 40px;

      > .item {
        display: flex;
        align-items: center;
        margin-bottom: 24px;

        > .img {
          margin-right: 16px;
        }

        > .name {
          font-weight: 500;
          font-size: 17px;
          line-height: 22px;
          letter-spacing: -0.0043em;

          span {
            color: $color-grey;
            padding-left: 14px;
          }
        }
      }
    }
  }
}
</style>

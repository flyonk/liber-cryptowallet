<template name="AddAccount">
  <div class="add-account">
    <div class="header">
      <img
        alt="arrow-left"
        class="back"
        src="@/assets/icon/arrow-left.svg"
        @click="$router.back()"
      />
      <h1 class="title">{{ $t('common.coinSelect') }}</h1>
      <label class="input-label">
        <i class="icon-search" />
        <input
          :placeholder="$t('common.searchCoin')"
          class="search"
          name="searchCoin"
          type="text"
        />
      </label>
    </div>
    <div class="main">
      <SelectCoin :coins="coins" @select-coin="selectCoin" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount } from 'vue';

import SelectCoin from '@/components/ui/molecules/deposit/SelectCoin.vue';
import { useCoinsStore } from '@/stores/coins';

const coinStore = useCoinsStore();

onBeforeMount(async () => {
  await coinStore.fetchCoins();
});

const coins = computed(() => coinStore.getCoins);

function selectCoin() {
  console.log('select coin');
}
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

      > .icon-search {
        font-size: 20px;
        position: absolute;
        top: 12px;
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
      color: $color-brand-primary;
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

          > span {
            color: $color-grey;
            padding-left: 14px;
          }
        }
      }
    }
  }
}
</style>

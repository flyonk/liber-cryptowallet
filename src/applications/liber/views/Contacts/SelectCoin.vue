<template name="SelectCoin">
  <div class="page-wrapper">
    <div class="page-header">
      <ABackHistoryBtn icon-type="close" />

      <h1 class="main-title text--title-1">
        {{ $t('views.deposit.selectCoin.selectCoin') }}
      </h1>

      <label class="input-label" for="searchCoin">
        <i class="icon-search" />
        <input
          :placeholder="$t('views.deposit.selectCoin.searchCoin')"
          class="search"
          name="searchCoin"
          type="text"
        />
      </label>
    </div>
    <MSelectCoin
      :coins="coins"
      :title="$t('views.deposit.selectCoin.allCoins')"
      :suggested-title="$t('views.deposit.selectCoin.suggested')"
      @select-coin="selectCoin"
    />
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { computed, inject, onBeforeMount } from 'vue';

import { useFundsStore } from '@/applications/liber/stores/funds';
import { useCoinsStore } from '@/applications/liber/stores/coins';

import { ICoin } from '@/applications/liber/models/funds/coin';
import { uiKitKey } from '@/types/symbols';

const router = useRouter();
const route = useRoute();
const fundsStore = useFundsStore();
const coinsStore = useCoinsStore();

const uiKit = inject(uiKitKey);
const { ABackHistoryBtn, MSelectCoin } = uiKit!;

onBeforeMount(async () => {
  await coinsStore.fetchCoins();
});

const coins = computed(() => coinsStore.getCoins);

const selectCoin = (item: ICoin) => {
  const coin = {
    name: item.name,
    code: item.code,
    img: item.imageUrl as string,
  };
  fundsStore.setCrypto(coin, route.params.type);
  router.go(-1);
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  margin: 15px;
  flex-grow: 1;
}

.main-title {
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

  > .icon-search {
    font-size: 20px;
    position: absolute;
    top: 12px;
    left: 10px;
    z-index: 1;
  }
}

.coin-list {
  margin-bottom: 40px;
}
</style>

<template name="SelectCoin">
  <div class="page-wrapper">
    <div class="page-header">
      <BackHistoryBtn icon-type="close" />

      <h1 class="main-title">
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
    <SelectCoin :coins="coins" @select-coin="selectCoin" />
  </div>
</template>

<script lang="ts" setup>
import { useRoute, useRouter } from 'vue-router';
import { computed, onBeforeMount } from 'vue';

import { useFundsStore } from '@/stores/funds';
import { useCoinsStore } from '@/stores/coins';

import SelectCoin from '@/components/ui/molecules/deposit/SelectCoin.vue';
import BackHistoryBtn from '@/components/ui/atoms/BackHistoryBtn.vue';
import { ICoin } from '@/models/funds/coin';

const router = useRouter();
const route = useRoute();
const fundsStore = useFundsStore();
const coinsStore = useCoinsStore();

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

  > .icon-search {
    font-size: 20px;
    position: absolute;
    top: 12px;
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

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
    <DepositSelectCoin @select-coin="selectCoin" />
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import DepositSelectCoin from '@/components/ui/molecules/deposit/DepositSelectCoin.vue';
import BackHistoryBtn from '@/components/ui/atoms/BackHistoryBtn.vue';
import { Route } from '@/router/types';

const router = useRouter();

const selectCoin = (item: any) => {
  console.log('selected coin', item);
  router.push({
    name: Route.DepositNetwork,
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

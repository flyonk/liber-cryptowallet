<template>
  <div class="page-header">
    <h1 class="title">{{ $t('views.deposit.selectCoin.selectCoin') }}</h1>
    <label class="input-label" for="searchCoin">
      <i class="icon-search" />
      <input
        id="searchCoin"
        v-model="query"
        :placeholder="$t('views.deposit.selectCoin.searchCoin')"
        class="search"
        name="searchCoin"
        type="text"
      />
    </label>
  </div>
  <m-select-coin
    :current-currency="currentCurrency"
    :coins="availableCoins"
    :title="$t('views.deposit.selectCoin.allCoins')"
    :suggested-title="$t('views.deposit.selectCoin.suggested')"
    @select-coin="$emit('select-coin', $event)"
  />
</template>

<script lang="ts" setup>
import { computed, inject, PropType, ref } from 'vue';

import { ICoin } from '@/applications/liber/models/funds/coin';
import { ICoinForExchange } from '@/applications/liber/stores/funds';
import { EUiKit } from '@/types/uiKit';

const uiKit = inject(EUiKit.uiKit);
const { MSelectCoin } = uiKit as any;

defineEmits(['back-button', 'select-coin']);

const props = defineProps({
  currentCurrency: {
    type: Object as PropType<ICoinForExchange>,
    default: () => ({} as ICoinForExchange),
  },
  coins: {
    type: Array as PropType<ICoin[]>,
    default: () => [],
  },
});

const query = ref('');

const availableCoins = computed(() => {
  return props.coins.filter(
    (coin) =>
      coin.code.toLowerCase().includes(query.value.toLowerCase()) ||
      coin.name.toLowerCase().includes(query.value.toLowerCase())
  );
});
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

  > .title {
    font-family: Inter, sans-serif;
    font-weight: 800;
    font-size: 28px;
    line-height: 34px;
    letter-spacing: 0.0038em;
    margin-bottom: 16px;
  }
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

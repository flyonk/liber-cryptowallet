<template>
  <div class="page-header">
    <h1 class="title">{{ $t('views.deposit.selectCoin.selectCoin') }}</h1>
    <label class="input-label" for="searchCoin">
      <i class="icon-search" />
      <input
        id="searchCoin"
        :placeholder="$t('views.deposit.selectCoin.searchCoin')"
        class="search"
        name="searchCoin"
        type="text"
      />
    </label>
  </div>
  <SelectCoin :coins="allCoins" @select-coin="$emit('select-coin', $event)" />
</template>

<script lang="ts" setup>
import SelectCoin from '@/components/ui/molecules/deposit/SelectCoin.vue';
import { getCurrentInstance, onBeforeMount, PropType, Ref, ref } from 'vue';
import { ICoin } from '@/models/coin/coins';
import { useCoinsStore } from '@/stores/coins';
import { useFundsStore } from '@/stores/funds';

const coinStore = useCoinsStore();
const { proxy } = getCurrentInstance();
const fundsStore = useFundsStore();

const { from } = fundsStore.getState;

defineEmits(['back-button', 'select-coin']);

const props = defineProps({
  coins: {
    type: Array as PropType<ICoin[]>,
    default: () => [],
  },
});

const allCoins = ref([]) as Ref<ICoin[]>;

onBeforeMount(async () => {
  console.log('yo', from?.code, props.coins);
  if (props.coins?.length) {
    allCoins.value = props.coins;
    return;
  }

  if (coinStore.getCoins.length) {
    allCoins.value = coinStore.getCoins;
    return;
  }

  try {
    await coinStore.fetchCoins();
    allCoins.value = coinStore.getCoins;
  } catch (e) {
    console.error(e);
    proxy.$sentry.capture(e, 'BaseCoinListSelect', 'onBeforeMount');
  }
  allCoins.value = allCoins.value.filter((i) => i.code !== from?.code);
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

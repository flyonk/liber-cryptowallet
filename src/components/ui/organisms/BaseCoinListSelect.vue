<template>
  <TopNavigation left-icon-name="ci-close_big" @click="$emit('back-button')">
    {{ $t('views.deposit.selectCoin.selectCoin') }}
  </TopNavigation>
  <div class="page-header">
    <label class="input-label" for="searchCoin">
      <img alt="search" class="icon" src="@/assets/icon/search.svg" />
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
import { TopNavigation } from '@/components/ui';
import { onBeforeMount, PropType, Ref, ref } from 'vue';
import { ICoin } from '@/models/coin/coins';
import { useCoinsStore } from '@/stores/coins';

const coinStore = useCoinsStore();

defineEmits(['back-button', 'select-coin']);
const props = defineProps({
  coins: {
    type: Array as PropType<ICoin[]>,
    default: () => [],
  },
});

const allCoins = ref([]) as Ref<ICoin[]>;

onBeforeMount(async () => {
  if (props.coins?.length) {
    allCoins.value = props.coins;
  } else {
    await coinStore.fetchCoins();

    allCoins.value = coinStore.getCoins;
  }
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

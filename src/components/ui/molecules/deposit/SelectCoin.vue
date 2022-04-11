<template name="SelectCoin">
  <div class="select-coin">
    <template v-if="hasPopularCoins">
      <h4 class="title">{{ $t('views.deposit.selectCoin.suggested') }}</h4>
      <ul class="coin-list suggested">
        <CoinItem
          v-for="item in popularCoins"
          :key="item.code"
          :full-name="item.name"
          :icon="item.imageUrl"
          :short-name="item.code.toUpperCase()"
          @click="$emit('select-coin', item)"
        />
      </ul>
    </template>

    <h4 class="title">{{ $t('views.deposit.selectCoin.allCoins') }}</h4>
    <ul class="coin-list suggested">
      <CoinItem
        v-for="item in allCoins"
        :key="item.code"
        :full-name="item.name"
        :icon="item.imageUrl"
        :short-name="item.code.toUpperCase()"
        @click="$emit('select-coin', item)"
      />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import CoinItem from '@/components/ui/atoms/coins/СoinItem.vue';
import { PropType } from 'vue-demi';
import { ICoin } from '@/models/coin/coins';
import { computed } from 'vue';

defineEmits(['select-coin']);

const props = defineProps({
  coins: {
    type: Array as PropType<ICoin[]>,
    required: true,
  },
});

const popularCoins = computed(() => props.coins.filter((e) => !!e?.isPopular));
const allCoins = computed(() => props.coins.filter((e) => !e?.isPopular));

const hasPopularCoins = computed(() => !!popularCoins.value.length);
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

.select-coin {
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

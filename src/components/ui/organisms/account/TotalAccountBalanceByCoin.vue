<template name="TotalAccountBalanceByCoin">
  <div class="count">
    <div class="flex">
      <h1 class="title title-currency">
        {{ balance }}
        <span class="currency">{{ coinCode.toUpperCase() }}</span>
      </h1>
      <img :src="coinIconUrl" alt class="icon" />
    </div>
    <p class="subtitle text--footnote color-dark-gray">
      {{ currency }} {{ baseConversionSum }}
    </p>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  balance: {
    type: String,
    default: '0',
  },
  coinCode: {
    type: String,
    default: 'tbtc',
  },
  baseConversionSum: {
    type: String,
    default: '0',
  },
  currency: {
    type: String,
    default: '€',
  },
  coinIconUrl: {
    type: String,
    default: '',
  },
});
</script>

<style lang="scss" scoped>
.count {
  > .flex {
    > .icon {
      height: 56px;
      width: 56px;
      background-color: $color-dark-grey;
      border-radius: 50%;
      margin-left: auto;
    }

    > .title {
      font-weight: 600;
      font-size: 28px;
      line-height: 34px;
      letter-spacing: 0.0038em;
    }
  }

  > .subtitle {
    margin-bottom: 28px;
  }
}
</style>

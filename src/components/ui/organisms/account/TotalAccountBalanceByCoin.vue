<template name="TotalAccountBalanceByCoin">
  <div class="count">
    <div class="flex">
      <h1 class="title title-currency">
        {{ balance }}
        <span class="currency">{{ coinCode.toUpperCase() }}</span>
      </h1>
      <!--      TODO: get logo of coin-->
      <img alt class="icon" />
    </div>
    <p class="subtitle heading-gray-md">
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
    default: 'USDT',
  },
  baseConversionSum: {
    type: String,
    default: '0',
  },
  currency: {
    type: String,
    default: '€',
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

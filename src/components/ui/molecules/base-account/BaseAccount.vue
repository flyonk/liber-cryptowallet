<template>
  <section class="base-account">
    <div class="image-wrap">
      <img alt="" src="" />
    </div>
    <div class="name text--callout font-weight--medium">
      <p class="title">
        {{ data.name }}
      </p>
      <p class="subtitle text--footnote">
        {{ data.code }}
      </p>
    </div>
    <div class="price">
      <p>{{ data.balance }} {{ data.code }}</p>
      <p class="subtitle text--footnote">
        {{ getSymbolByCode(data.baseBalanceConversionCode) }}
        {{ data.baseBalanceConversion }}
      </p>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';

import { IAccount } from '@/models/account/account';
import { getSymbolByCode } from '@/helpers/currency';

defineProps({
  data: {
    type: Object as PropType<IAccount>,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.base-account {
  display: flex;
  align-items: center;

  &:not(:last-child) {
    margin-bottom: 24px;
  }

  > .image-wrap {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 48px;
    height: 48px;
    background: $color-grey-100;
    margin-right: 12px;
    border-radius: 8px;
  }

  > .name {
    font-weight: 500;

    > .subtitle {
      color: $color-dark-grey;
    }
  }

  > .price {
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    text-align: right;
    letter-spacing: -0.0031em;
    margin-left: auto;

    > .subtitle {
      color: $color-dark-grey;
    }
  }
}
</style>

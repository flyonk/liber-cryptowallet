<template>
  <div class="middle-info flex">
    <ul class="fees-data">
      <li class="fees-item">
        <div class="circle">-</div>
        <p class="sum">
          {{ convertInfo && convertInfo.fee }}
          {{ currentSendFromCurrency && currentSendFromCurrency.name }}
        </p>
        <p class="name">{{ $t('views.deposit.convert.fee') }}</p>
      </li>
      <li class="fees-item">
        <div class="circle">=</div>
        <p class="sum">
          {{ convertInfo && convertInfo.requestAmount }}
          {{ currentSendFromCurrency && currentSendFromCurrency.name }}
        </p>
        <p class="name">{{ $t('views.deposit.convert.amountCovert') }}</p>
      </li>
      <li class="fees-item">
        <div class="circle">x</div>
        <p class="sum">
          {{ preventConvert ? '0' : convertInfo && convertInfo.rate }}
          {{ currentSendToCurrency && currentSendToCurrency.name }}
        </p>
        <p :class="{ '-red': componentState === 'refresh' }" class="name">
          <template v-if="loading">
            {{ $t('transactions.convert.updating') }}
          </template>
          <template v-else-if="componentState === 'refresh'">
            {{ $t('transactions.convert.rateChanged') }}
          </template>
          <template v-else>
            {{ $t('views.deposit.convert.guaranteedRate') }}
            ({{ preventConvert ? '30' : timer }}s)
          </template>
        </p>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { PropType } from 'vue';
import { IConvertInfo } from '@/applications/liber/models/funds/convertInfo';
import { ICoinForExchange } from '@/applications/servicesapp/stores/funds';

defineProps({
  convertInfo: {
    type: Object as PropType<IConvertInfo>,
    required: true,
  },
  currentSendFromCurrency: {
    type: Object as PropType<ICoinForExchange>,
    required: true,
  },
  currentSendToCurrency: {
    type: Object as PropType<ICoinForExchange>,
    required: true,
  },
  preventConvert: {
    type: Boolean,
    default: false,
  },
  componentState: {
    type: String,
    default: '',
  },
  loading: {
    type: Boolean,
    default: false,
  },
  timer: {
    type: Number,
    default: 0,
  },
});
</script>

<style lang="scss" scoped>
.fees-data {
  width: 100%;
}

.fees-item {
  display: flex;
  margin-bottom: 10px;
  margin-left: -10px;

  > .circle {
    background: #eaefff;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 20px;
    height: 20px;
    margin-right: 10px;
    padding-bottom: 2px;
    font-weight: bold;
    font-size: 14px;
  }

  > .sum {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;
    color: $color-brand-550;
    margin-right: 8px;
  }

  > .name {
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;
    color: $color-brand-2-300;

    &.-red {
      color: $color-red-500;
    }
  }
}

.middle-info {
  display: flex;
  justify-content: space-between;
  min-height: 110px;
  width: 100%;
  border-left: 1px solid #eaefff;
  margin-left: 10px;
}
</style>

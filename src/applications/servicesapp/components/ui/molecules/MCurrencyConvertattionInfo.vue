<template>
  <div class="middle-info flex">
    <ul class="fees-data">
      <AConvertInfoItem
        sign-icon="-"
        :convert-info="convertInfo && convertInfo.fee"
        :currency="currentSendFromCurrency && currentSendFromCurrency.name"
        :title="$t('views.deposit.convert.fee')"
      />
      <AConvertInfoItem
        sign-icon="="
        :convert-info="convertInfo && convertInfo.requestAmount"
        :currency="currentSendFromCurrency && currentSendFromCurrency.name"
        :title="$t('views.deposit.convert.amountCovert')"
      />
      <AConvertInfoItem
        sign-icon="x"
        :convert-info="preventConvert ? '0' : convertInfo && convertInfo.rate"
        :currency="currentSendToCurrency && currentSendToCurrency.name"
        :title="rateTitle"
        :is-warning="componentState === 'refresh'"
      />
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { PropType, computed } from 'vue';
import { IConvertInfo } from '@/applications/liber/models/funds/convertInfo';
import { ICoinForExchange } from '@/applications/servicesapp/stores/funds';
import { AConvertInfoItem } from '@/components/ui';
import { useI18n } from 'vue-i18n';

const { tm } = useI18n();

const props = defineProps({
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

const rateTitle = computed(() => {
  if (props.loading) {
    return tm('transactions.convert.updating');
  }
  if (props.componentState === 'refresh') {
    return tm('transactions.convert.rateChanged');
  }
  return `${tm('views.deposit.convert.guaranteedRate')} ${
    props.preventConvert ? '30' : props.timer
  }s}`;
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

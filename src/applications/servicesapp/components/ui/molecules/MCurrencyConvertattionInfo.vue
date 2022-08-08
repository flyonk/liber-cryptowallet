<template>
  <div class="middle-info flex">
    <div v-if="isOneCoinEmpty" class="choose-coin">
      <img
        class="icon"
        src="@/assets/icon/help_circle_outline.svg"
        alt="help"
      />
      <h1 class="title">{{ $t('views.deposit.convert.selectCoin') }}</h1>
    </div>
    <ul v-else class="fees-data">
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

const isOneCoinEmpty = computed(
  () =>
    props.currentSendFromCurrency.code === 'empty' ||
    props.currentSendToCurrency.code === 'empty'
);
</script>

<style lang="scss" scoped>
.fees-data {
  width: 100%;
}

.middle-info {
  display: flex;
  justify-content: space-between;
  min-height: 110px;
  width: 100%;
  border-left: 1px solid #eaefff;
  margin-left: 10px;
}

.choose-coin {
  display: flex;
  align-items: center;
  margin-left: -12px;

  > .icon {
    margin-right: 8px;
  }

  > .title {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    color: $color-brand-550;
  }
}
</style>

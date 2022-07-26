<template>
  <keep-alive>
    <div
      class="change-currency"
      @wheel.prevent
      @touchmove.prevent
      @scroll.prevent
    >
      <div class="input-wrapper relative m-0">
        <label class="change-from">
          <p class="label">
            {{ $t('services.convert.convertExactly') }}
          </p>
          <input
            v-model="convertInfo.requestAmount"
            autofocus
            class="input"
            :class="{
              '-error': !amountLimitsIsOk,
            }"
            inputmode="decimal"
            pattern="[0-9]*"
            type="number"
            @blur="onBlur"
            @input="debounceChangeInfo('from')"
          />
          <select-coin-input
            :current-currency="currentSendFromCurrency"
            :show-select-dialog="false"
          />
        </label>
      </div>
      <MCurrencyConvertattionInfo
        v-if="amountLimitsIsOk"
        :convert-info="convertInfo"
        :current-send-from-currency="currentSendFromCurrency"
        :current-send-to-currency="currentSendToCurrency"
        :prevent-convert="preventConvert"
        :component-state="componentState"
        :loading="loading"
        :timer="timer"
      />
      <p v-else class="limit-warning">{{ outOfLimitWarningText }}</p>
      <div class="input-wrapper relative w-full mb-5">
        <label class="change-from">
          <p class="label">{{ $t('views.deposit.convert.youWillGet') }}</p>
          <input
            v-model="convertInfo.estimatedAmount"
            class="input"
            inputmode="decimal"
            pattern="[0-9]*"
            type="number"
            @blur="onBlur"
            @input="debounceChangeInfo('to')"
          />
          <select-coin-input
            :coins="toCoins"
            :current-currency="currentSendToCurrency"
            @on-select-coin="onSelectCoin($event, 'to')"
          />
        </label>
      </div>
      <BaseButton
        v-if="loading"
        block
        class="send-button"
        size="large"
        view="simple"
      >
        <triple-dots-spinner />
      </BaseButton>
      <BaseButton
        v-else-if="componentState === 'refresh'"
        :disabled="preventConvert"
        block
        class="send-button"
        size="large"
        view="secondary"
        @click="onRefresh"
      >
        {{ $t('views.deposit.convert.refresh') }}
      </BaseButton>
      <BaseButton
        v-else-if="componentState === 'preview'"
        :disabled="preventConvert"
        block
        class="send-button"
        size="large"
        view="simple"
        @click="previewChangeInfo('from')"
      >
        {{ $t('transactions.convert.preview') }}
      </BaseButton>
      <BaseButton
        v-else
        :disabled="preventConvert"
        block
        class="send-button"
        size="large"
        view="simple"
        @click="convertCurrency"
      >
        {{ convertTtitle }} ({{ timer }}s)
      </BaseButton>
    </div>
  </keep-alive>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, Ref, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { debounce } from 'lodash';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';

import {
  ICoinForExchange,
  useFundsStore,
} from '@/applications/servicesapp/stores/funds';
import { useCoinsStore } from '@/applications/liber/stores/coins';
import { ServicesRoutes } from '@/applications/servicesapp/router/types';
import { ICoin } from '@/applications/liber/models/funds/coin';
import { STATIC_BASE_URL } from '@/constants';
import { TConvertCouponData } from '@/applications/servicesapp/models/funds/convertInfo';
import { useErrorsStore } from '@/stores/errors';
import { useMfaStore } from '@/stores/mfa';
import { useLiberSaveStore } from '@/applications/servicesapp/stores/libersave';

import { BaseButton } from '@/components/ui';
import TripleDotsSpinner from '@/components/ui/atoms/TripleDotsSpinner.vue';
import SelectCoinInput from '@/components/ui/molecules/transfers/SelectCoinInput.vue';

import MCurrencyConvertattionInfo from '@/applications/servicesapp/components/ui/molecules/MCurrencyConvertattionInfo.vue';

const errorsStore = useErrorsStore();

const props = defineProps({
  minAmount: {
    type: Number,
    default: null,
  },
  maxAmount: {
    type: Number,
    default: null,
  },
});

defineEmits<{
  (event: 'show-2fa'): void;
}>();

const liberSaveStore = useLiberSaveStore();
const coinStore = useCoinsStore();
const fundsStore = useFundsStore();
const toast = useToast();
const { tm } = useI18n();
const route = useRoute();

const convertTtitle = computed(() => {
  if (route.name === ServicesRoutes.GetCryptoFunds) {
    return tm('services.getcrypto.convertNow');
  }
  return tm('services.convert.convertNow');
});

const DEBOUNCE_TIMER = 1000;

const componentState = ref('preview');
const loading = ref(false);

const timer = ref(30);
const startTimer = ref(0) as Ref<number>;

const convertInfo = computed(() => fundsStore.getConvertInfo);
const convert = computed(() => fundsStore.getConvertFunds);

const allCoins = ref([]) as Ref<ICoin[]>;

const currentSendFromCurrency = computed(
  () => fundsStore.getState.from as ICoinForExchange
);
const currentSendToCurrency = computed(
  () => fundsStore.getState.to as ICoinForExchange
);

const isZeroValues = computed(() => {
  return (
    Number(fundsStore.convertInfo.requestAmount) === 0 &&
    Number(fundsStore.convertInfo.estimatedAmount) === 0
  );
});

const preventConvert = computed(() => {
  return loading.value || isZeroValues.value || !amountLimitsIsOk.value;
});

const amountLimitsIsOk = computed(() => {
  const _num = Number(fundsStore.convertInfo.requestAmount);
  const minIsOk =
    props.minAmount === null || _num > props.minAmount || _num === 0;
  const maxIsOk = props.maxAmount === null || _num < props.maxAmount;
  return minIsOk && maxIsOk;
});

const outOfLimitWarningText = computed(() => {
  const _num = Number(fundsStore.convertInfo.requestAmount);
  if (_num < props.minAmount) {
    return `${tm('services.convert.minAmount')}: ${props.minAmount}`;
  } else {
    return `${tm('services.convert.maxAmount')}: ${props.maxAmount}`;
  }
});

const toCoins = computed(() =>
  allCoins.value.filter(
    (coin) => coin.code !== currentSendFromCurrency.value.code
  )
);

onBeforeMount(async () => {
  try {
    await coinStore.fetchCoins();
    allCoins.value = coinStore.getCoins;
  } catch (err) {
    errorsStore.handle({
      err,
      name: 'ChangeCurrency',
      ctx: 'onBeforeMount',
      description: 'Fetch coins error',
    });
  }

  fundsStore.setCrypto(
    {
      name: 'EUR',
      code: 'eur',
      img: `${STATIC_BASE_URL}/static/currencies/euro.svg`,
    },
    'from'
  );
});

function getCorrectValue(value: number) {
  if (value === 0) return 0;
  const v1 = Math.max(value, 0.000005);
  return Math.min(v1, 100000000);
}

function onRefresh() {
  previewChangeInfo('from');
  timer.value = 30;
  componentState.value = 'send';
}

function changeInfoInterval() {
  clearInterval(startTimer.value);

  timer.value = 30;

  if (isZeroValues.value) {
    componentState.value = 'preview';
    loading.value = true;
    return;
  }

  startTimer.value = setInterval(() => {
    if (timer.value > 0) {
      timer.value = timer.value - 1;
    } else {
      timer.value = 30;
      componentState.value = 'refresh';
      clearInterval(startTimer.value);
    }
  }, 1000) as unknown as number;

  loading.value = true;
}

async function previewChangeInfo(direction: 'from' | 'to') {
  componentState.value = 'send';

  try {
    changeInfoInterval();
    if (
      currentSendFromCurrency.value.code === currentSendToCurrency.value.code
    ) {
      return;
    }

    const data: TConvertCouponData = {
      from_code: '',
      to_code: '',
      request_amount: '',
      request_coupon: '',
    };

    data.from_code = currentSendFromCurrency.value.code;
    data.to_code = currentSendToCurrency.value.code;
    data.request_amount =
      direction === 'from'
        ? String(getCorrectValue(Number(fundsStore.convertInfo.requestAmount)))
        : String(
            getCorrectValue(Number(fundsStore.convertInfo.estimatedAmount))
          );
    data.request_coupon =
      direction === 'from'
        ? currentSendFromCurrency.value.code
        : currentSendToCurrency.value.code;

    await fundsStore.checkConvertInfo(data);
  } catch (err) {
    errorsStore.handle({
      err,
      name: 'ChangeCurrency',
      ctx: 'previewChangeInfo',
      description: "error can't retrieve convert coupons info",
    });
  } finally {
    loading.value = false;
  }
}

const debounceChangeInfo = debounce(previewChangeInfo, DEBOUNCE_TIMER);

function convertCurrency() {
  const mfaStore = useMfaStore();
  const successRoute =
    route.name === ServicesRoutes.GetCryptoFunds
      ? ServicesRoutes.DashboardHome
      : ServicesRoutes.DashboardHome + '?success=getcoupons';
  mfaStore.show({
    button: 'services.convert.convertNow',
    successRoute: successRoute,
    callback: async () => {
      fundsStore.$reset();
      if (route.name === ServicesRoutes.GetCryptoFunds) {
        // @TODO redirect to liber save checkout
        // with urls for success and fail
        // window.location = 'https://liber.save.checkout.redirect';
        // success callback route: ServicesRoutes.DashboardHome + '?success=getcrypto'
        // failed callback route: ServicesRoutes.DashboardHome + '?error=getcrypto'
      }
    },
  });
  convertFunds();
}

async function convertFunds() {
  try {
    loading.value = true;
    if (route.name === ServicesRoutes.GetCryptoFunds) {
      await fundsStore.getCrypto({
        from_code: currentSendFromCurrency.value.code,
        to_code: currentSendToCurrency.value.code,
        amount: String(Number(fundsStore.convertInfo.requestAmount)),
      });
    } else {
      await fundsStore.changeCurrency({
        from_code: currentSendFromCurrency.value.code,
        to_code: currentSendToCurrency.value.code,
        amount: String(Number(fundsStore.convertInfo.requestAmount)),
        email: liberSaveStore.getEmail,
      });
    }
  } catch (err) {
    const code = err?.response?.data?.code;

    // insufficient funds case
    if (Number(code) === 0) {
      toast.add({
        severity: 'error',
        summary: tm('transactions.convert.insufficientfunds') as string,
        life: 3000,
        closable: true,
      });
    }

    errorsStore.handle({
      err,
      name: 'OChangeCurrency',
      ctx: 'convertFunds',
      description: "Error can't convert currency",
    });
  } finally {
    loading.value = false;
  }
}

if (convert.value) {
  convertFunds();
}

function onBlur(event: FocusEvent) {
  const elem = event.target as HTMLInputElement;

  if (event.relatedTarget) {
    (event.relatedTarget as HTMLInputElement).focus();
  } else {
    elem?.focus();
  }
}

const onSelectCoin = (coinInfo: ICoin, direction: 'to') => {
  fundsStore.setCrypto(
    {
      name: coinInfo.name,
      code: coinInfo.code,
      img: coinInfo.imageUrl as string,
    },
    direction
  );

  const isAnyDirectionClear =
    currentSendToCurrency.value.code === 'empty' ||
    currentSendFromCurrency.value.code === 'empty';

  if (preventConvert.value || isAnyDirectionClear) {
    return;
  }

  previewChangeInfo(direction);
};

watch(isZeroValues, (val) => {
  if (val) componentState.value = 'preview';
});
</script>

<style lang="scss" scoped>
.change-currency {
  width: 100%;
}

.change-from {
  > .label {
    position: absolute;
    left: 17px;
    top: 6px;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    color: $color-brand-2-300;
  }

  > .input {
    width: 100%;
    height: 72px;
    border: 1px solid $color-primary-100;
    border-radius: 12px;
    background: $color-white;
    outline: none;
    padding: 21px 130px 10px 10px;
    font-weight: 500;
    font-size: 20px;
    line-height: 25px;
    letter-spacing: -0.0045em;
    color: $color-brand-550;

    &:focus {
      border: 1px solid $color-primary-500;
    }

    &.-error {
      border: 1px solid $color-red-500;
    }
  }
}

.limit-warning {
  font-weight: normal;
  font-size: 12px;
  line-height: 26px;
  color: $color-red-500;
  height: 110px;
}
</style>

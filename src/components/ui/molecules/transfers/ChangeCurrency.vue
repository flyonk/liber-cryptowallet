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
          <p class="label">{{ $t('views.deposit.convert.convertExactly') }}</p>
          <input
            v-model="convertInfo.requestAmount"
            autofocus
            class="input"
            inputmode="decimal"
            pattern="[0-9]*"
            type="number"
            :readonly="isOneCoinEmpty"
            @blur="onBlur"
            @input="debounceChangeInfo('from')"
          />
          <select-coin-input
            :coins="fromCoins"
            :direction="'from'"
            :current-send-currency="currentSendFromCurrency"
            @on-select-coin="onSelectCoin($event, 'from')"
          />
        </label>
      </div>
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
          <li class="fees-item">
            <div class="circle">-</div>
            <p class="sum">
              {{ convertInfo.fee }} {{ currentSendFromCurrency.name }}
            </p>
            <p class="name">{{ $t('views.deposit.convert.fee') }}</p>
          </li>
          <li class="fees-item">
            <div class="circle">=</div>
            <p class="sum">
              {{ fundsStore.convertInfo.requestAmount }}
              {{ currentSendFromCurrency.name }}
            </p>
            <p class="name">{{ $t('views.deposit.convert.amountCovert') }}</p>
          </li>
          <li class="fees-item">
            <div class="circle">x</div>
            <p class="sum">
              {{ preventConvert ? '0' : convertInfo.rate }}
              {{ currentSendToCurrency.name }}
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
        <coin-switcher v-if="hasCoinReverse" @switch="swapCoins" />
      </div>
      <div class="input-wrapper relative w-full mb-5">
        <label class="change-from">
          <p class="label">{{ $t('views.deposit.convert.youWillGet') }}</p>
          <input
            v-model="convertInfo.estimatedAmount"
            class="input"
            inputmode="decimal"
            pattern="[0-9]*"
            type="number"
            :readonly="isOneCoinEmpty"
            @blur="onBlur"
            @input="debounceChangeInfo('to')"
          />
          <select-coin-input
            :coins="toCoins"
            :direction="'to'"
            :current-send-currency="currentSendToCurrency"
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
        <tripple-dots-spinner />
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
        {{ $t('transactions.convert.convertNow') }} ({{ timer }}s)
      </BaseButton>
    </div>
  </keep-alive>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, Ref, ref, watch } from 'vue';
import { debounce } from 'lodash';
import { useRoute, useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';

import { ICoinForExchange, useFundsStore } from '@/stores/funds';
import { useCoinsStore } from '@/stores/coins';
// import SentryUtil from '@/helpers/sentryUtil';
import { Route } from '@/router/types';
import { ICoin } from '@/models/coin/coins';
import { STATIC_BASE_URL } from '@/constants';
import { TConvertData } from '@/models/funds/convertInfo';

import { BaseButton } from '@/components/ui';
import TrippleDotsSpinner from '@/components/ui/atoms/TrippleDotsSpinner.vue';
import CoinSwitcher from '@/components/ui/atoms/coins/CoinSwitcher.vue';
import SelectCoinInput from '@/components/ui/molecules/transfers/SelectCoinInput.vue';
import { useErrorsStore } from '@/stores/errors';

const errorsStore = useErrorsStore();

const emit = defineEmits<{
  (event: 'show-2fa'): void;
}>();

defineProps({
  hasCoinReverse: {
    type: Boolean,
    default: false,
  },
});

const coinStore = useCoinsStore();
const fundsStore = useFundsStore();
const toast = useToast();
const { tm } = useI18n();
const router = useRouter();
const route = useRoute();

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

const isOneCoinEmpty = computed(
  () =>
    currentSendFromCurrency.value.code === 'empty' ||
    currentSendToCurrency.value.code === 'empty'
);

const isZeroValues = computed(() => {
  return (
    Number(fundsStore.convertInfo.requestAmount) === 0 &&
    Number(fundsStore.convertInfo.estimatedAmount) === 0
  );
});

const preventConvert = computed(() => {
  return (
    loading.value ||
    Number(fundsStore.convertInfo.requestAmount) === 0 ||
    isZeroValues.value
  );
});

const emptyCryptoState = computed(() => {
  return {
    name: '---',
    code: 'empty',
    img: getEmptyCoinImageSrc(),
  };
});

const fromCoins = computed(() =>
  allCoins.value.filter(
    (coin) => coin.code !== currentSendToCurrency.value.code
  )
);

const toCoins = computed(() =>
  allCoins.value.filter(
    (coin) => coin.code !== currentSendFromCurrency.value.code
  )
);

onBeforeMount(async () => {
  try {
    await coinStore.fetchCoins();
    allCoins.value = coinStore.getCoins;
  } catch (e) {
    console.error(e);
  }

  if (route.query.code) {
    const fromCoin = allCoins.value.find(
      (coin) => coin.code === route.query.code
    );

    fundsStore.setCrypto(
      {
        name: fromCoin?.name as string,
        code: fromCoin?.code as string,
        img: fromCoin?.imageUrl as string,
      },
      'from'
    );
  }

  fundsStore.setCrypto(emptyCryptoState.value, 'to');
});

function getCorrectValue(value: number) {
  if (value === 0) return 0;
  const v1 = Math.max(value, 0.000005);
  return Math.min(v1, 100000000);
}

function getEmptyCoinImageSrc() {
  return `${STATIC_BASE_URL}/currencies/empty_token.svg`;
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

    const data: Omit<TConvertData, 'amount'> = {
      from: '',
      to: '',
      request_amount: '',
    };

    data.from = currentSendFromCurrency.value.code;
    data.to = currentSendToCurrency.value.code;
    data.request_amount =
      direction === 'from'
        ? String(getCorrectValue(Number(fundsStore.convertInfo.requestAmount)))
        : String(
            getCorrectValue(Number(fundsStore.convertInfo.estimatedAmount))
          );
    data.request_coin =
      direction === 'from'
        ? currentSendFromCurrency.value.code
        : currentSendToCurrency.value.code;

    await fundsStore.checkConvertInfo(data);
  } catch (err) {
    errorsStore.handle(
      err,
      'ChangeCurrency',
      'checkConvertInfo',
      "error can't retrieve convert info"
    );
  } finally {
    loading.value = false;
  }
}

const debounceChangeInfo = debounce(previewChangeInfo, DEBOUNCE_TIMER);

function convertCurrency() {
  emit('show-2fa');
}

async function convertFunds() {
  try {
    loading.value = true;
    await fundsStore.changeCurrency({
      from: currentSendFromCurrency.value.code,
      to: currentSendToCurrency.value.code,
      amount: String(Number(fundsStore.convertInfo.requestAmount)),
    });
    fundsStore.$reset();
    router.push({
      name: Route.DashboardHome,
    });
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

    errorsStore.handle(
      err,
      'ChangeCurrency',
      'convertCurrency',
      "error can't convert currency"
    );
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

const swapCoins = () => {
  if (isZeroValues.value) {
    componentState.value = 'preview';
    return;
  }

  fundsStore.swapCoins();

  previewChangeInfo('from');
};

const onSelectCoin = (coinInfo: ICoin, direction: 'from' | 'to') => {
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
  }
}

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

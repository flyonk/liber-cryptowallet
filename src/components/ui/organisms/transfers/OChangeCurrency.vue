<template>
  <keep-alive>
    <div
      class="change-currency"
      @wheel.prevent
      @touchmove.prevent
      @scroll.prevent
    >
      <m-base-input
        v-model="convertInfo.requestAmount"
        autofocus
        class="base-input"
        inputmode="decimal"
        mode="decimal"
        pattern="[0-9]*"
        type="number"
        :readonly="isOneCoinEmpty"
        :min-fraction-digits="0"
        :max-fraction-digits="10"
        @blur="onBlur"
        @input="debounceChangeInfo('from', $event)"
      >
        <template #append>{{
          $t('views.deposit.convert.convertExactly')
        }}</template>
        <template #actions>
          <o-select-coin-input
            :coins="fromCoins"
            :current-currency="currentSendFromCurrency"
            @on-select-coin="onSelectCoin($event, 'from')"
          />
        </template>
      </m-base-input>
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
        <a-coin-switcher v-if="hasCoinReverse" @switch="swapCoins" />
      </div>
      <m-base-input
        v-model="convertInfo.estimatedAmount"
        class="base-input"
        inputmode="decimal"
        mode="decimal"
        :min-fraction-digits="0"
        :max-fraction-digits="10"
        pattern="[0-9]*"
        type="number"
        :readonly="isOneCoinEmpty"
        @blur="onBlur"
        @input="debounceChangeInfo('to', $event)"
      >
        <template #append>{{
          $t('views.deposit.convert.convertExactly')
        }}</template>
        <template #actions>
          <o-select-coin-input
            :coins="toCoins"
            :current-currency="currentSendToCurrency"
            @on-select-coin="onSelectCoin($event, 'to')"
          />
        </template>
      </m-base-input>
      <m-base-button
        v-if="loading"
        block
        class="send-button"
        size="large"
        view="simple"
      >
        <a-tripple-dots-spinner />
      </m-base-button>
      <m-base-button
        v-else-if="componentState === 'refresh'"
        :disabled="preventConvert"
        block
        class="send-button"
        size="large"
        view="secondary"
        @click="onRefresh"
      >
        {{ $t('views.deposit.convert.refresh') }}
      </m-base-button>
      <m-base-button
        v-else-if="componentState === 'preview'"
        :disabled="preventConvert"
        block
        class="send-button"
        size="large"
        view="simple"
        @click="previewChangeInfo('from')"
      >
        {{ $t('transactions.convert.preview') }}
      </m-base-button>
      <m-base-button
        v-else
        :disabled="preventConvert"
        block
        class="send-button"
        size="large"
        view="simple"
        @click="convertCurrency"
      >
        {{ $t('transactions.convert.convertNow') }} ({{ timer }}s)
      </m-base-button>
      <m-base-toast
        :visible="isMfaErrorExists"
        content-style="border-radius:32px;"
        @update:visible="setToastState"
      >
        <template #content-header>
          <div class="success-header font-weight--medium text--title-3">
            {{ $t('transactions.convert.convertFailTitle') }}
          </div>
        </template>
        <template #description>
          <div class="success-description text--body">
            {{ mfaErrorMessage }}
          </div>
        </template>
      </m-base-toast>
    </div>
  </keep-alive>
</template>

<script lang="ts" setup>
import { computed, inject, onBeforeMount, Ref, ref, watch } from 'vue';
import { debounce } from 'lodash';
import { useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';

import {
  ICoinForExchange,
  useFundsStore,
} from '@/applications/liber/stores/funds';
import { useCoinsStore } from '@/applications/liber/stores/coins';
import { Route } from '@/router/types';
import { ICoin } from '@/applications/liber/models/funds/coin';
import { STATIC_BASE_URL } from '@/constants';
import { TConvertData } from '@/applications/liber/models/funds/convertInfo';
import { useErrorsStore } from '@/stores/errors';
import { useMfaStore } from '@/stores/mfa';
import { uiKitKey } from '@/types/symbols';

import OSelectCoinInput from '@/components/ui/organisms/transfers/OSelectCoinInput.vue';

const uiKit = inject(uiKitKey);
const {
  ACoinSwitcher,
  ATrippleDotsSpinner,
  MBaseButton,
  MBaseInput,
  MBaseToast,
} = uiKit!;

const errorsStore = useErrorsStore();
const coinStore = useCoinsStore();
const fundsStore = useFundsStore();

defineEmits<{
  (event: 'show-2fa'): void;
}>();

defineProps({
  hasCoinReverse: {
    type: Boolean,
    default: false,
  },
});

const toast = useToast();
const { tm } = useI18n();
const route = useRoute();
const mfaStore = useMfaStore();

const DEBOUNCE_TIMER = 1000;

const componentState = ref('preview');
const loading = ref(false);

const timer = ref(30);
const startTimer = ref(0) as Ref<number>;

const convertInfo = computed(() => fundsStore.getConvertInfo);
const convert = computed(() => fundsStore.getConvertFunds);
const isMfaErrorExists = computed(() => mfaStore.existsError);
const mfaErrorMessage = computed(() => {
  if (mfaStore.errorData?.data.message === 'insufficient funds') {
    return tm('transactions.convert.insufficientfunds');
  }

  return tm('transactions.convert.unhandledError');
});

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
  } catch (err) {
    errorsStore.handle({
      err,
      name: 'ChangeCurrency',
      ctx: 'onBeforeMount',
      description: 'Fetch coins error',
    });
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

function setToastState() {
  mfaStore.setError(null);
}

function getCorrectValue(value: number) {
  if (value === 0) return 0;
  const v1 = Math.max(value, 0.000005);
  return Math.min(v1, 100000000);
}

function getEmptyCoinImageSrc() {
  return `${STATIC_BASE_URL}/static/currencies/empty_token.svg`;
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

const proxyPreviewChangeInfo = (direction: 'from' | 'to', event: any) => {
  if (event === null) event = 0;

  if (direction === 'from')
    fundsStore.getConvertInfo.requestAmount = '' + event;
  if (direction === 'to')
    fundsStore.getConvertInfo.estimatedAmount = '' + event;
  previewChangeInfo(direction);
};

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
    errorsStore.handle({
      err,
      name: 'ChangeCurrency',
      ctx: 'previewChangeInfo',
      description: "error can't retrieve convert info",
    });
  } finally {
    loading.value = false;
  }
}

// const debounceChangeInfo = debounce(previewChangeInfo, DEBOUNCE_TIMER);
const debounceChangeInfo = debounce(proxyPreviewChangeInfo, DEBOUNCE_TIMER);

function convertCurrency() {
  mfaStore.show({
    button: 'transactions.convertTransaction',
    successRoute: Route.DashboardHome,
    callback: async () => {
      //
    },
  });
  convertFunds();
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const syncTest = (type: any, event: any) => {
  console.log('syncTest', event);
  if (type === 'from') {
    convertInfo.value.requestAmount = event;
    debounceChangeInfo(type);
    return;
  }
  convertInfo.value.estimatedAmount = event;
  debounceChangeInfo(type);
};
</script>

<style lang="scss" scoped>
.change-currency {
  width: 100%;

  > .send-button {
    margin-top: 37px;
  }

  > .base-input {
    height: 70px;
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
  padding-right: 10px;
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

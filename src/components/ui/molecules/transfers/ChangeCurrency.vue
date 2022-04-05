<template>
  <keep-alive>
    <div class="change-currency">
      <div class="input-wrapper mb-2 relative m-0">
        <label class="change-from">
          <p class="label">{{ $t('views.deposit.convert.convertExactly') }}</p>
          <input
            v-model="convertInfo.requestAmount"
            autofocus
            class="input"
            type="number"
            @blur="onBlur"
            @input="debounceChangeInfo('from')"
          />
          <div class="select" @click="showSelectCoinDialog.from = true">
            <div class="select-option flex">
              <img :src="currentSendFromCurrency.img" alt class="icon" />
              <p class="name">{{ currentSendFromCurrency.name }}</p>
              <img alt="list" src="@/assets/icon/arrow-down.svg" />
              <div></div>
              <p-dialog
                v-model:visible="showSelectCoinDialog.from"
                :show-header="false"
                class="p-dialog-maximized"
              >
                <BaseCoinListSelect
                  @back-button="showSelectCoinDialog.from = false"
                  @select-coin="onSelectCoin($event, 'from')"
                />
              </p-dialog>
            </div>
          </div>
        </label>
      </div>
      <div class="middle-info flex">
        <ul class="fees-data">
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
              {{ convertInfo.rate }} {{ currentSendToCurrency.name }}
            </p>
            <p :class="{ '-red': componentState === 'refresh' }" class="name">
              <template v-if="loading">
                {{ $t('transactions.convert.updating') }}
              </template>
              <template v-else-if="componentState === 'refresh'">
                {{ $t('transactions.convert.rateChanged') }}
              </template>
              <template v-else>
                {{ $t('views.deposit.convert.guaranteedRate') }} ({{ timer }}s)
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
            type="number"
            @blur="onBlur"
            @input="debounceChangeInfo('to')"
          />
          <div class="select select-to" @click="showSelectCoinDialog.to = true">
            <div class="select-option flex">
              <img :src="currentSendToCurrency.img" class="icon" />
              <p class="name">{{ currentSendToCurrency.name }}</p>
              <img alt="list" src="@/assets/icon/arrow-down.svg" />
              <p-dialog
                v-model:visible="showSelectCoinDialog.to"
                :show-header="false"
                class="p-dialog-maximized"
              >
                <BaseCoinListSelect
                  @back-button="showSelectCoinDialog.to = false"
                  @select-coin="onSelectCoin($event, 'to')"
                />
              </p-dialog>
            </div>
          </div>
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
import { computed, ref, Ref, watch } from 'vue';
import { debounce } from 'lodash';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { useToast } from 'primevue/usetoast';

import { ICoinForExchange, useFundsStore } from '@/stores/funds';
import SentryUtil from '@/helpers/sentryUtil';
import { Route } from '@/router/types';
import { ICoin } from '@/models/coin/coins';

import { BaseButton, BaseCoinListSelect } from '@/components/ui';
import TrippleDotsSpinner from '@/components/ui/atoms/TrippleDotsSpinner.vue';
import CoinSwitcher from '@/components/ui/atoms/coins/CoinSwitcher.vue';

//TODO rethink about it
const showSelectCoinDialog = ref({
  from: false,
  to: false,
});

const emit = defineEmits<{
  (event: 'show-2fa'): void;
}>();

defineProps({
  hasCoinReverse: {
    type: Boolean,
    default: false,
  },
});

const fundsStore = useFundsStore();
const toast = useToast();
const { tm } = useI18n();
const router = useRouter();

const DEBOUNCE_TIMER = 1000;
let _convertDirectionBack = false;

const componentState = ref('preview');
const loading = ref(false);

const timer = ref(30);
const startTimer = ref(0) as Ref<number>;

const convertInfo = computed(() => fundsStore.getConvertInfo);
const convert = computed(() => fundsStore.getConvertFunds);

const currentSendFromCurrency = computed(
  () => fundsStore.getState.from as ICoinForExchange
);
const currentSendToCurrency = computed(
  () => fundsStore.getState.to as ICoinForExchange
);

const isSameCurrencies = computed(() => {
  return (
    currentSendFromCurrency.value.code === currentSendToCurrency.value.code
  );
});

const isZeroValues = computed(() => {
  return (
    +fundsStore.convertInfo.requestAmount === 0 &&
    +fundsStore.convertInfo.estimatedAmount === 0
  );
});

const preventConvert = computed(() => {
  return (
    loading.value ||
    +fundsStore.convertInfo.requestAmount === 0 ||
    isSameCurrencies ||
    isZeroValues
  );
});

watch(isSameCurrencies, (val) => {
  if (val) componentState.value = 'preview';
});

watch(isZeroValues, (val) => {
  if (val) componentState.value = 'preview';
});

// onBeforeUnmount(() => {
//   TODO: this hook clear store when we go to 2FA screen
//   fundsStore.$reset();
// });

function onRefresh() {
  previewChangeInfo('from');
  timer.value = 30;
  componentState.value = 'send';
}

function changeInfoInterval() {
  clearInterval(startTimer.value);

  timer.value = 30;

  startTimer.value = setInterval(() => {
    if (timer.value > 0) {
      timer.value = timer.value - 1;
    } else {
      componentState.value = 'refresh';
      timer.value = 30;
      clearInterval(startTimer.value);
    }
  }, 1000) as unknown as number;

  loading.value = true;
}

async function previewChangeInfo(dir: 'from' | 'to') {
  if (_convertDirectionBack) {
    _convertDirectionBack = false;
    return;
  }
  componentState.value = 'send';
  try {
    changeInfoInterval();
    if (
      currentSendFromCurrency.value.code === currentSendToCurrency.value.code
    ) {
      return;
    }
    let data = {
      from:
        dir === 'from'
          ? currentSendFromCurrency.value.code || ''
          : currentSendToCurrency.value.code || '',
      to:
        dir === 'from'
          ? currentSendToCurrency.value.code || ''
          : currentSendFromCurrency.value.code,
      request_amount:
        dir === 'from'
          ? String(+fundsStore.convertInfo.requestAmount)
          : String(+fundsStore.convertInfo.estimatedAmount),
    };
    await fundsStore.checkConvertInfo(data, dir);
  } catch (err) {
    SentryUtil.capture(
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
      amount: String(+fundsStore.convertInfo.requestAmount),
    });
    fundsStore.$reset();
    router.push({
      name: Route.DashboardHome,
    });
  } catch (err) {
    const code = err?.response?.data?.code;

    // insufficient funds case
    if (+code === 0) {
      toast.add({
        severity: 'error',
        summary: tm('transactions.convert.insufficientfunds') as string,
        life: 3000,
        closable: true,
      });
    }

    SentryUtil.capture(
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

const onBlur = (event: FocusEvent) => {
  const newElem = event.relatedTarget?.nodeName;
  const elem = event.target;
  if (newElem !== 'INPUT' && newElem !== 'BUTTON') {
    elem?.focus();
  }
};

const swapCoins = () => {
  fundsStore.swapCoins();

  previewChangeInfo('from');
};

const onSelectCoin = (coinInfo: ICoin, direction: 'from' | 'to') => {
  fundsStore.setCrypto(
    coinInfo.name,
    coinInfo.code,
    coinInfo.imageUrl,
    direction
  );

  showSelectCoinDialog.value[direction] = false;

  if (preventConvert.value) {
    return;
  }

  previewChangeInfo('from');
};
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
    color: #0d1f3c;

    &:focus {
      border: 1px solid $color-primary-500;
    }
  }

  > .select {
    position: absolute;
    right: 4px;
    top: 4px;
    width: 114px;
    height: 64px;
    background: #edf0fb;
    border-radius: 13px;
    border: 0;
  }
}

.select-option {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;

  > .icon {
    width: 24px;
    height: 24px;
    margin-right: 4px;
  }

  > .name {
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.0008em;
    color: #0d1f3c;
    margin-right: 18px;
  }
}

.fees-data {
  border-left: 1px solid $color-primary-50;
  margin-bottom: 10px;
  margin-left: 10px;
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
    color: #0d1f3c;
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
</style>

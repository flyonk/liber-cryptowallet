<template>
  <keep-alive>
    <div class="change-currency">
      <div class="input-wrapper mb-2 relative m-0">
        <label class="change-from">
          <p class="label">{{ $t('views.deposit.convert.convertExactly') }}</p>
          <input
            v-model="requestAmount"
            type="number"
            class="input"
            autofocus
            @blur="onBlur"
          />
          <div class="select">
            <router-link
              :to="{ name: 'choose_coin', params: { type: 'from' } }"
              class="select-option flex"
            >
              <img class="icon" :src="currentSendFromCurrency.img.value" />
              <p class="name">{{ currentSendFromCurrency.name.value }}</p>
              <img src="@/assets/icon/arrow-down.svg" alt="list" />
            </router-link>
          </div>
        </label>
      </div>
      <div class="middle-info flex">
        <ul class="fees-data">
          <li class="fees-item">
            <div class="circle">-</div>
            <p class="sum">
              {{ convertInfo.fee }} {{ currentSendFromCurrency.name.value }}
            </p>
            <p class="name">{{ $t('views.deposit.convert.fee') }}</p>
          </li>
          <li class="fees-item">
            <div class="circle">=</div>
            <p class="sum">
              {{ requestAmount }} {{ currentSendFromCurrency.name.value }}
            </p>
            <p class="name">{{ $t('views.deposit.convert.amountCovert') }}</p>
          </li>
          <li class="fees-item">
            <div class="circle">x</div>
            <p class="sum">
              {{ convertInfo.rate }} {{ currentSendToCurrency.name.value }}
            </p>
            <p class="name">
              {{ $t('views.deposit.convert.guarantedRate') }} (10min)
            </p>
          </li>
        </ul>
        <coin-switcher v-if="hasCoinReverse" @switch="replaceCoins" />
      </div>
      <div class="input-wrapper relative w-full mb-5">
        <label class="change-from">
          <p class="label">{{ $t('views.deposit.convert.youWillGet') }}</p>
          <input
            v-model="convertInfo.estimatedAmount"
            type="number"
            class="input"
            :readonly="true"
            @blur="onBlur"
            @input="onChangeEstimatedAmount"
          />
          <div class="select select-to">
            <div class="select-option flex">
              <router-link
                :to="{ name: 'choose_coin', params: { type: 'to' } }"
                class="select-option flex"
              >
                <img class="icon" :src="currentSendToCurrency.img.value" />
                <p class="name">{{ currentSendToCurrency.name.value }}</p>
                <img src="@/assets/icon/arrow-down.svg" alt="list" />
              </router-link>
            </div>
          </div>
        </label>
      </div>
      <BaseButton
        class="send-button"
        size="large"
        view="simple"
        :disabled="disableBtnHandler"
        @click="handleClick"
      >
        <template v-if="ctaState === 'refresh'">{{
          $t('views.deposit.convert.refresh')
        }}</template>
        <template v-else-if="loading">
          <tripple-dots-spinner />
        </template>
        <template v-else>
          {{ ctaState === 'preview' ? 'Preview' : `Convert Now (${timer}s)` }}
        </template>
      </BaseButton>
    </div>
  </keep-alive>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

import { Route } from '@/router/types';
import { useRouter } from 'vue-router';
import { useFundsStore } from '@/stores/funds';
import { debounce } from 'lodash';
import { BaseButton } from '@/components/ui';
import SentryUtil from '@/helpers/sentryUtil';
import TrippleDotsSpinner from '@/components/ui/atoms/TrippleDotsSpinner.vue';
import CoinSwitcher from '@/components/ui/atoms/coins/CoinSwitcher.vue';

defineProps({
  hasCoinReverse: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits<{
  (event: 'show-2fa'): void;
}>();

const fStore = useFundsStore();
let convertInfo = computed(() => fStore.getConvertInfo);
const convert = computed(() => fStore.getConvertFunds);

const { from, to, imgFrom, imgTo, codeFrom, codeTo } = fStore.getState;

const router = useRouter();

const ctaState = ref('preview');
const loading = ref(false);

const DEBOUNCE_TIMER = 500;

const timer = ref(30);
const startTimer = ref(0);

const currentSendFromCurrency = {
  name: ref(from || 'TBTC'),
  code: ref('tbtc'),
  img: ref(imgFrom || require('@/assets/icon/currencies/btc.svg')),
};

const currentSendToCurrency = {
  name: ref(to || 'LTC'),
  code: ref('tltc'),
  img: ref(imgTo || require('@/assets/icon/currencies/ltc.svg')),
};

let requestAmount = ref<number>(+fStore.convertInfo.estimatedAmount);

const disableBtnHandler = computed(() => {
  if (loading.value || requestAmount.value === 0 || codeFrom === codeTo) {
    return true;
  }
  return false;
});

function handleClick() {
  if (ctaState.value === 'refresh') {
    previewChangeInfo();
    timer.value = 30;
    ctaState.value = 'send';
    return;
  }
  ctaState.value === 'preview' ? previewChangeInfo() : convertCurrency();
}

function changeInfoInterval() {
  clearInterval(startTimer.value);
  timer.value = 30;
  startTimer.value = setInterval(() => {
    if (timer.value > 0) {
      timer.value = timer.value - 1;
    } else {
      ctaState.value = 'refresh';
      timer.value = 30;
      clearInterval(startTimer.value);
    }
  }, 1000);
  loading.value = true;
}

async function previewChangeInfo() {
  ctaState.value = 'send';
  if (!requestAmount.value) return;
  try {
    changeInfoInterval();
    if (from === to) return;
    await fStore.checkConvertInfo({
      from: codeFrom || currentSendFromCurrency.code.value,
      to: codeTo || currentSendToCurrency.code.value,
      request_amount: String(requestAmount.value),
    });
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

async function previewChangeInfoBack() {
  const _requestAmount = fStore.convertInfo.estimatedAmount;
  if (!_requestAmount) return;
  ctaState.value = 'send';
  try {
    changeInfoInterval();
    if (from === to) return;
    await fStore.checkConvertInfoBack({
      to: codeFrom || currentSendFromCurrency.code.value,
      from: codeTo || currentSendToCurrency.code.value,
      request_amount: String(_requestAmount),
    });
    requestAmount.value = +(fStore.convertInfo.requestAmount || 0);
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
const debounceChangeInfoBack = debounce(previewChangeInfoBack, DEBOUNCE_TIMER);

watch(requestAmount, debounceChangeInfo);

const onChangeEstimatedAmount = () => {
  debounceChangeInfoBack();
};

function convertCurrency() {
  emit('show-2fa');
}

async function convertFunds() {
  try {
    loading.value = true;
    await fStore.changeCurrency({
      from: currentSendFromCurrency.code.value,
      to: currentSendToCurrency.code.value,
      amount: String(requestAmount.value),
    });
    router.push({
      name: Route.DashboardHome,
    });
    fStore.clearConvertInfo();
  } catch (err) {
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

const onBlur = (event: any) => {
  const newElem = event.relatedTarget?.nodeName;
  const elem = event.target;
  if (newElem !== 'INPUT' && newElem !== 'BUTTON') {
    elem.focus();
  }
};

const replaceCoins = () => {
  fStore.replaceCoins();
  const { from, to, imgFrom, imgTo } = fStore.getState;

  const _codeFrom = currentSendFromCurrency.code.value;

  currentSendFromCurrency.name.value = from || '';
  currentSendFromCurrency.img.value = imgFrom;
  currentSendFromCurrency.code.value = currentSendToCurrency.code.value;

  currentSendToCurrency.name.value = to || '';
  currentSendToCurrency.img.value = imgTo;
  currentSendToCurrency.code.value = _codeFrom;

  requestAmount.value = +fStore.convertInfo?.estimatedAmount;
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
    color: #78809b;
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

.options-list {
  position: absolute;
  top: 70px;
  width: 100%;
  right: 0;
  background: #edf0fb;
  border-radius: 13px;
  padding: 10px 18px;
  z-index: 2;
}

.options-item {
  width: 100%;
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  cursor: pointer;

  &:last-child {
    margin-bottom: 0;
  }

  > .icon {
    width: 24px;
    height: 24px;
    margin-right: 4px;
  }

  > .currency {
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
  }
}

.clock-wrapper {
  font-weight: 400;
  font-size: 12px;
  line-height: 16px;
  color: $color-red-500;
}

.different-coins {
  display: flex;
  align-items: center;
  height: 110px;

  > .text {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;
    color: #0d1f3c;
  }
}
</style>

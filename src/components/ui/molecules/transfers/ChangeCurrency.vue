<template>
  <keep-alive>
    <div class="change-currency">
      <div class="input-wrapper mb-2 relative m-0">
        <label class="change-from">
          <p class="label">{{ $t('views.deposit.convert.convertExactly') }}</p>
          <input
            v-model="convertInfo.requestAmount"
            type="number"
            class="input"
            autofocus
            @blur="onBlur"
            @input="debounceChangeInfo('from')"
          />
          <div class="select">
            <router-link
              :to="{ name: 'choose_coin', params: { type: 'from' } }"
              class="select-option flex"
            >
              <img class="icon" :src="currentSendFromCurrency.img" />
              <p class="name">{{ currentSendFromCurrency.name }}</p>
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
              {{ convertInfo.fee }} {{ currentSendFromCurrency.name }}
            </p>
            <p class="name">{{ $t('views.deposit.convert.fee') }}</p>
          </li>
          <li class="fees-item">
            <div class="circle">=</div>
            <p class="sum">
              {{ requestAmount }} {{ currentSendFromCurrency.name }}
            </p>
            <p class="name">{{ $t('views.deposit.convert.amountCovert') }}</p>
          </li>
          <li class="fees-item">
            <div class="circle">x</div>
            <p class="sum">
              {{ convertInfo.rate }} {{ currentSendToCurrency.name }}
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
            @blur="onBlur"
            @input="debounceChangeInfo('to')"
          />
          <div class="select select-to">
            <div class="select-option flex">
              <router-link
                :to="{ name: 'choose_coin', params: { type: 'to' } }"
                class="select-option flex"
              >
                <img class="icon" :src="currentSendToCurrency.img" />
                <p class="name">{{ currentSendToCurrency.name }}</p>
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
import { computed, ref } from 'vue';
import { debounce } from 'lodash';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

import { useFundsStore } from '@/stores/funds';
import SentryUtil from '@/helpers/sentryUtil';

import { BaseButton } from '@/components/ui';
import TrippleDotsSpinner from '@/components/ui/atoms/TrippleDotsSpinner.vue';
import CoinSwitcher from '@/components/ui/atoms/coins/CoinSwitcher.vue';
import { useToast } from 'primevue/usetoast';

import { Route } from '@/router/types';

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
const toast = useToast();
const { tm } = useI18n();

const currentSendFromCurrency = ref(fStore.getState.from);
const currentSendToCurrency = ref(fStore.getState.to);

const router = useRouter();

const ctaState = ref('preview');
const loading = ref(false);

const DEBOUNCE_TIMER = 300;

const timer = ref(30);
const startTimer = ref(0);
let _convertDirectionBack = false;

const disableBtnHandler = computed(() => {
  if (
    loading.value ||
    +fStore.convertInfo.requestAmount === 0 ||
    currentSendFromCurrency.value?.code === currentSendToCurrency.value?.code
  ) {
    return true;
  }
  return false;
});

function handleClick() {
  if (ctaState.value === 'refresh') {
    previewChangeInfo('from');
    timer.value = 30;
    ctaState.value = 'send';
    return;
  }
  ctaState.value === 'preview' ? previewChangeInfo('from') : convertCurrency();
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

async function previewChangeInfo(dir: 'from' | 'to') {
  if (_convertDirectionBack) {
    _convertDirectionBack = false;
    return;
  }
  ctaState.value = 'send';
  try {
    changeInfoInterval();
    if (
      currentSendFromCurrency.value?.code === currentSendToCurrency.value?.code
    ) {
      return;
    }
    let data = {
      from: currentSendFromCurrency.value?.code || '',
      to: currentSendToCurrency.value?.code || '',
      request_amount: String(+fStore.convertInfo.requestAmount),
    };
    if (dir === 'to') {
      _convertDirectionBack = true;
      data = {
        to: currentSendFromCurrency.value?.code || '',
        from: currentSendToCurrency.value?.code || '',
        request_amount: String(fStore.convertInfo.estimatedAmount),
      };
    }
    await fStore.checkConvertInfo(data, dir);
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
    await fStore.changeCurrency({
      from: convertInfo.value.from,
      to: convertInfo.value.to,
      amount: String(+fStore.convertInfo.requestAmount),
    });
    fStore.$reset();
    router.push({
      name: Route.DashboardHome,
    });
  } catch (err: any) {
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

const onBlur = (event: any) => {
  const newElem = event.relatedTarget?.nodeName;
  const elem = event.target;
  if (newElem !== 'INPUT' && newElem !== 'BUTTON') {
    elem.focus();
  }
};

const replaceCoins = () => {
  fStore.replaceCoins();
  const { from, to } = fStore.getState;
  const _codeFrom = currentSendFromCurrency.value.code;

  currentSendFromCurrency.value.name = from?.name || '';
  currentSendFromCurrency.value.img = from?.img;
  currentSendFromCurrency.value.code = currentSendToCurrency.value.code;

  currentSendToCurrency.value.name = to?.code || '';
  currentSendToCurrency.value.img = to?.img;
  currentSendToCurrency.value.code = _codeFrom;
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

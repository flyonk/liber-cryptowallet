<template>
  <div class="change-currency">
    <div class="input-wrapper mb-2 relative m-0">
      <label class="change-from">
        <p class="label">You send exactly</p>
        <input type="number" class="input" autofocus @blur="onBlur" />
        <div class="select">
          <router-link
            :to="{ name: 'choose_coin', params: { type: 'from' } }"
            class="select-option flex"
          >
            <img class="icon" :src="currentSendFromCurrency.img" />
            <p class="name">{{ currentSendFromCurrency.name.value }}</p>
            <img src="@/assets/icon/arrow-down.svg" alt="list" />
          </router-link>
        </div>
      </label>
    </div>
    <ul class="fees-data">
      <li class="fees-item">
        <div class="circle" style="opacity: 0">=</div>
        <p class="sum" style="">&nbsp;</p>
        <p class="name" style="opacity: 0">Amount we’ll covert</p>
      </li>
      <li class="fees-item">
        <div class="circle">-</div>
        <p class="sum">0.0005 BTC</p>
        <p class="name">Transfer Fee</p>
      </li>
      <li class="fees-item">
        <div class="circle" style="opacity: 0">x</div>
        <p class="sum" style="opacity: 0">0.19811656 USD</p>
        <p class="name" style="opacity: 0">Guaranteed rate (100h)</p>
      </li>
    </ul>
    <div class="input-wrapper relative w-full mb-5">
      <label class="change-from">
        <p class="label">Ashley will get</p>
        <input type="number" class="input mb-2" @blur="onBlur" />
        <div class="select select-to">
          <router-link
            :to="{ name: 'choose_coin', params: { type: 'to' } }"
            class="select-option flex"
          >
            <img class="icon" :src="currentSendToCurrency.img" />
            <p class="name">{{ currentSendToCurrency.name.value }}</p>
            <img src="@/assets/icon/arrow-down.svg" alt="list" />
          </router-link>
        </div>
      </label>
      <BaseCountdown v-if="showCountdown" seconds="30" @time:up="onTimeIsUp">
        <template #countdown="{ minute, second }">
          <p class="clock-wrapper">
            {{ $t('auth.login.step2ResendTitle') }}
            {{ minute }}:{{ second }}
          </p>
        </template>
      </BaseCountdown>
    </div>
    <BaseButton
      v-if="currentButton === 'send'"
      class="send-button"
      size="large"
      view="simple"
      @click="sendTransaction"
    >
      Send
    </BaseButton>
    <BaseButton
      v-else
      class="send-button"
      size="large"
      view="simple"
      :disabled="disableRefreshBtn"
      @click="currentButton = 'send'"
    >
      Refresh
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { BaseButton } from '@/components/ui';

import { BaseCountdown } from '@/components/ui';

import { useConvertFundsStore } from '@/stores/convertFunds';

const fundsStore = useConvertFundsStore();

const { from, to, imgFrom, imgTo } = fundsStore.getState;

console.log('show me from', from, imgFrom, imgTo);

const showCountdown = ref(false);

const currentSendFromCurrency = {
  name: ref(from || 'BTC'),
  img: imgFrom || require('@/assets/icon/currencies/btc.svg'),
};

const currentSendToCurrency = {
  name: ref(to || 'BTC'),
  img: require('@/assets/icon/currencies/btc.svg'),
};

let currentButton = ref('send');
let disableRefreshBtn = ref(true);

// function changeCurrentCurrency(index: number, type: string) {

// }

const emit = defineEmits(['send-transaction']);

// const currencies = [
//   {
//     name: 'BTC',
//     img: require('@/assets/icon/currencies/btc.svg'),
//   },
//   {
//     name: 'USDT',
//     img: require('@/assets/icon/currencies/tether.svg'),
//   },
//   {
//     name: 'ETH',
//     img: require('@/assets/icon/currencies/eth.svg'),
//   },
//   {
//     name: 'XRP',
//     img: require('@/assets/icon/currencies/xrp.svg'),
//   },
// ];

const onBlur = (event: any) => {
  const newElem = event.relatedTarget?.nodeName;
  const elem = event.target;
  if (newElem !== 'INPUT' && newElem !== 'BUTTON') {
    elem.focus();
  }
};

const onTimeIsUp = () => {
  showCountdown.value = false;
  disableRefreshBtn.value = false;
  emit('send-transaction');
};

const sendTransaction = () => {
  currentButton.value = 'refresh';
  showCountdown.value = true;
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
</style>

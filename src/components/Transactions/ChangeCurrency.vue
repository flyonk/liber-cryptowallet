<template>
  <div class="change-currency">
    <div class="input-wrapper mb-2 relative m-0">
      <label class="change-from">
        <p class="label">You send exactly</p>
        <input
          type="number"
          class="input"
          autofocus
          @blur="onBlur"
        >
        <div class="select">
          <div
            class="select-option flex"
            @click="showCryptoList(1)"
          >
            <img
              class="icon"
              :src="currentSendFromCurrency.img"
            >
            <p class="name">{{ currentSendFromCurrency.name.value }}</p>
            <img
              src="@/assets/icon/arrow-down.svg"
              alt="list"
            >
          </div>
          <ul
            v-if="isSelectListOpen && currentOpenedSelectId === 1"
            class="options-list"
          >
            <li
              v-for="(currency, index) in currencies"
              :key="index"
              class="options-item"
              @click="changeCurrentCurrency(index, 'from')"
            >
              <img
                class="icon"
                :src="currency.img"
                alt=""
              >
              <p class="currency">{{ currency.name }}</p>
            </li>
          </ul>
        </div>
      </label>
    </div>
    <ul class="fees-data">
      <li class="fees-item">
        <div class="circle">
          -
        </div>
        <p class="sum">
          0.12345678 BTC
        </p>
        <p class="name">
          Transfer Fee
        </p>
      </li>
      <li class="fees-item">
        <div class="circle">
          =
        </div>
        <p class="sum">
          0.19811656 BTC
        </p>
        <p class="name">
          Amount we’ll covert
        </p>
      </li>
      <li class="fees-item">
        <div class="circle">
          x
        </div>
        <p class="sum">
          0.19811656 USD
        </p>
        <p class="name">
          Guaranteed rate (100h)
        </p>
      </li>
    </ul>
    <div class="input-wrapper relative w-full mb-5">
      <label class="change-from">
        <p class="label">Ashley will get</p>
        <input
          type="number"
          class="input"
          @blur="onBlur"
        >
        <div class="select select-to">
          <div
            class="select-option flex"
            @click="showCryptoList(2)"
          >
            <img
              class="icon"
              :src="currentSendToCurrency.img"
            >
            <p class="name">{{ currentSendToCurrency.name.value }}</p>
            <img
              src="@/assets/icon/arrow-down.svg"
              alt="list"
            >
          </div>
          <ul
            v-if="isSelectListOpen && currentOpenedSelectId === 2"
            class="options-list"
          >
            <li
              v-for="(currency, index) in currencies"
              :key="index"
              class="options-item"
              @click="changeCurrentCurrency(index, 'to')"
            >
              <img
                class="icon"
                :src="currency.img"
                alt=""
              >
              <p class="currency">{{ currency.name }}</p>
            </li>
          </ul>
        </div>
      </label>
    </div>
    <BaseButton
      class="send-button"
      size="large"
      view="simple"
      @click="$emit('send-transaction')"
    >
      Send
    </BaseButton>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import BaseButton from '@/components/UI/BaseButton.vue'

const currentSendFromCurrency = { 
  name: ref('BTC'),
  img: require('@/assets/icon/currencies/btc.svg')
}

const currentSendToCurrency = { 
  name: ref('BTC'),
  img: require('@/assets/icon/currencies/btc.svg')
}

let isSelectListOpen = ref(false)
let currentOpenedSelectId = ref(1)

function showCryptoList(listId: number) {
  isSelectListOpen.value = !isSelectListOpen.value
  currentOpenedSelectId.value = null
  currentOpenedSelectId.value = listId
}

function changeCurrentCurrency(index: number, type: string) {
  if (type === 'from') {
    currentSendFromCurrency.name.value = currencies[index].name
    currentSendFromCurrency.img = currencies[index].img
  }

  if (type === 'to') {
    currentSendToCurrency.name.value = currencies[index].name
    currentSendToCurrency.img = currencies[index].img
  }

  isSelectListOpen.value = false
}

defineEmits(['send-transaction']);

// function sendTransaction() {
//   console.log('test send transc')
//   $emit('send')
// }

const currencies = [
  {
    name: 'BTC',
    img: require('@/assets/icon/currencies/btc.svg'),
  },
  {
    name: 'USDT',
    img: require('@/assets/icon/currencies/tether.svg'),
  },
  {
    name: 'ETH',
    img: require('@/assets/icon/currencies/eth.svg'),
  },
  {
    name: 'XRP',
    img: require('@/assets/icon/currencies/xrp.svg'),
  },
];

const onBlur = (event: any) => {
  const newElem = event.relatedTarget?.nodeName
  const elem = event.target
  if (newElem !== 'INPUT' && newElem !== 'BUTTON') {
    elem.focus()
  }
}
</script>

<style lang="scss" scoped>
.change-currency {
  width: 100%;
}


.change-from {
  >.label {
    position: absolute;
    left: 17px;
    top: 6px;
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    color: #78809B;
  }

  >.input {
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
    color: #0D1F3C;

    &:focus {
      border: 1px solid $color-primary-500;
    }
  }

  >.select {
    position: absolute;
    right: 4px;
    top: 4px;
    width: 114px;
    height: 64px;
    background: #EDF0FB;
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

  >.icon {
    width: 24px;
    height: 24px;
    margin-right: 4px;
  }

  >.name {
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.0008em;
    color: #0D1F3C;
    margin-right: 18px;
  }
}

.options-list {
  position: absolute;
  top: 70px;
  width: 100%;
  right: 0;
  background: #EDF0FB;
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

  >.icon {
    width: 24px;
    height: 24px;
    margin-right: 4px;
  }

  >.currency {
    font-weight: 600;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.0008em;
    color: #0D1F3C;
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

  >.circle {
    background: #EAEFFF;
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

  >.sum {
    font-weight: 500;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;
    color: #0D1F3C;
    margin-right: 8px;
  }

  >.name {
    font-weight: normal;
    font-size: 12px;
    line-height: 16px;
    display: flex;
    align-items: center;
    color: $color-brand-2-300;
  }
}
</style>
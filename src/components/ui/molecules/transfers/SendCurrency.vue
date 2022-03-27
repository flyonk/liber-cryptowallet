<template>
  <div class="change-currency">
    <div class="input-wrapper mb-2 relative m-0">
      <label class="change-from">
        <p class="label">You send exactly</p>
        <input
          v-model="amount"
          type="number"
          min="0"
          class="input"
          autofocus
          @blur="onBlur"
        />
        <div class="select">
          <div class="select-option flex" @click="showCryptoList(1)">
            <img class="icon" :src="currentSendFromCurrency.img" />
            <p class="name">{{ currentSendFromCurrency.name.value }}</p>
            <img src="@/assets/icon/arrow-down.svg" alt="list" />
          </div>
          <ul
            v-if="isSelectListOpen && currentOpenedSelectId === 1"
            class="options-list"
          >
            <li
              v-for="(currency, index) in currencies"
              :key="index"
              class="options-item"
              @click="handleChangeCurrentCurrency(index, 'from')"
            >
              <img class="icon" :src="currency.img" alt="" />
              <p class="currency">{{ currency.name }}</p>
            </li>
          </ul>
        </div>
      </label>
    </div>
    <ul class="fees-data">
      <li class="fees-item">
        <div class="circle">-</div>
        <p class="sum">0 {{ currentSendToCurrency.name.value }}</p>
        <p class="name">Transfer Fee</p>
      </li>
    </ul>
    <div class="input-wrapper relative w-full mb-5">
      <label class="change-from">
        <p class="label">{{ props.contactName }} will get</p>
        <input
          v-model="recipientAmount"
          type="number"
          min="0"
          disabled
          class="input"
          @blur="onBlur"
        />
        <div class="select select-to">
          <div class="select-option flex" @click="showCryptoList(2)">
            <img class="icon" :src="currentSendToCurrency.img" />
            <p class="name">{{ currentSendToCurrency.name.value }}</p>
            <img src="@/assets/icon/arrow-down.svg" alt="list" />
          </div>
          <ul
            v-if="isSelectListOpen && currentOpenedSelectId === 2"
            class="options-list"
          >
            <li
              v-for="(currency, index) in currencies"
              :key="index"
              class="options-item"
              @click="handleChangeCurrentCurrency(index, 'to')"
            >
              <img class="icon" :src="currency.img" alt="" />
              <p class="currency">{{ currency.name }}</p>
            </li>
          </ul>
        </div>
      </label>
    </div>
    <base-button
      class="send-button"
      size="large"
      view="simple"
      @click="$emit('send-transaction')"
    >
      Send
    </base-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { BaseButton } from '@/components/ui';
import { useTransferStore } from '@/stores/transfer';

const props = defineProps({
  contactName: {
    type: String,
    default: '',
  },
});

const transferStore = useTransferStore();
let amount = ref('');
let recipientAmount = ref('');

onMounted(() => {
  transferStore.coin = currencies[0].code;
});

watch(amount, () => {
  const fee = 0;
  recipientAmount.value = String(+amount.value - fee);
  transferStore.amount = recipientAmount.value;
});

const currentSendFromCurrency = {
  name: ref('TBTC'),
  code: ref('tbtc'),
  img: require('@/assets/icon/currencies/btc.svg'),
};

const currentSendToCurrency = {
  name: ref('TBTC'),
  code: ref('tbtc'),
  img: require('@/assets/icon/currencies/btc.svg'),
};

let isSelectListOpen = ref(false);
let currentOpenedSelectId = ref(1);

function showCryptoList(listId: number) {
  isSelectListOpen.value = !isSelectListOpen.value;
  currentOpenedSelectId.value = null;
  currentOpenedSelectId.value = listId;
}

function handleChangeCurrentCurrency(index: number, type: string) {
  if (type === 'from') {
    currentSendFromCurrency.name.value = currencies[index].name;
    currentSendFromCurrency.img = currencies[index].img;

    // now API allows send X to X currency
    _setCurrentSendToCurrency(index);
    //

    transferStore.coin = currentSendFromCurrency.name.value;
  }

  if (type === 'to') {
    // temporary off
    // _setCurrentSendToCurrency(index);
  }

  isSelectListOpen.value = false;
}

defineEmits(['send-transaction']);

const currencies = [
  {
    name: 'TBTC',
    code: 'tbtc',
    img: require('@/assets/icon/currencies/btc.svg'),
  },
  {
    name: 'TLTC',
    code: 'tltc',
    img: require('@/assets/icon/currencies/ltc.svg'),
  },
  // {
  //   name: 'BTC',
  //   code: 'btc',
  //   img: require('@/assets/icon/currencies/btc.svg'),
  // },
  // {
  //   name: 'USDT',
  //   code: 'usdt',
  //   img: require('@/assets/icon/currencies/tether.svg'),
  // },
  // {
  //   name: 'ETH',
  //   code: 'eth',
  //   img: require('@/assets/icon/currencies/eth.svg'),
  // },
  // {
  //   name: 'XRP',
  //   code: 'xrp',
  //   img: require('@/assets/icon/currencies/xrp.svg'),
  // },
];

const _setCurrentSendToCurrency = (index: number) => {
  currentSendToCurrency.name.value = currencies[index].name;
  currentSendToCurrency.img = currencies[index].img;
};

const onBlur = (event: any) => {
  const newElem = event.relatedTarget?.nodeName;
  const elem = event.target;
  if (newElem !== 'INPUT' && newElem !== 'BUTTON') {
    elem.focus();
  }
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
</style>

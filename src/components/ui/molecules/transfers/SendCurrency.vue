<template>
  <div class="change-currency">
    <m-base-input
      v-model="amount"
      class="m-base-input"
      type="number"
      mode="decimal"
      inputmode="decimal"
      :min-fraction-digits="0"
      :max-fraction-digits="10"
      view="flat"
      @blur="onBlur"
    >
      <template #append>You send exactly</template>
      <template #prepend
        ><m-select-coin-input
          :coins="currencies"
          :current-currency="{
            name: currentSendFromCurrency.name.value,
            code: currentSendFromCurrency.code.value,
            img: currentSendFromCurrency.img,
          }"
          @on-select-coin="
            handleChangeCurrentCurrency(
              currencies.findIndex((e) => e.code === $event.code),
              ESendInputType.From
            )
          "
      /></template>
    </m-base-input>

    <ul class="fees-data">
      <li class="fees-item">
        <div class="circle">-</div>
        <p class="sum">0 {{ currentSendToCurrency.name.value }}</p>
        <p class="name">Transfer Fee</p>
      </li>
    </ul>

    <m-base-input
      v-model="recipientAmount"
      class="m-base-input"
      type="number"
      mode="decimal"
      inputmode="decimal"
      :min-fraction-digits="0"
      :max-fraction-digits="10"
      disabled
      @blur="onBlur"
    >
      <template #append>{{ props.contactName }} will get</template>
      <template #prepend
        ><m-select-coin-input
          :coins="currencies"
          :current-currency="{
            name: currentSendToCurrency.name.value,
            code: currentSendToCurrency.code.value,
            img: currentSendToCurrency.img,
          }"
          @on-select-coin="
            handleChangeCurrentCurrency(
              currencies.findIndex((e) => e.code === $event.code),
              ESendInputType.To
            )
          "
      /></template>
    </m-base-input>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useTransferStore } from '@/applications/liber/stores/transfer';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { MSelectCoin, MBaseInput } from '@liber-biz/crpw-ui-kit-liber';
import MSelectCoinInput from '@/components/ui/molecules/transfers/SelectCoinInput.vue';
import { STATIC_BASE_URL } from '@/constants';
import { ICoin } from '@/applications/liber/models/funds/coin';

enum ESendInputType {
  From = 'from',
  To = 'to',
}

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
  img: `${STATIC_BASE_URL}/static/currencies/btc.svg`,
};

const currentSendToCurrency = {
  name: ref('TBTC'),
  code: ref('tbtc'),
  img: `${STATIC_BASE_URL}/static/currencies/btc.svg`,
};

let isSelectListOpen = ref(false);
let currentOpenedSelectId = ref(1);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function showCryptoList(listId: number) {
  isSelectListOpen.value = !isSelectListOpen.value;
  currentOpenedSelectId.value = listId;
}

function handleChangeCurrentCurrency(index: number, type: string) {
  console.log('!start! handleChangeCurrentCurrency', index, type);
  if (type === ESendInputType.From) {
    currentSendFromCurrency.name.value = currencies[index].name;
    currentSendFromCurrency.code.value = currencies[index].code;
    currentSendFromCurrency.img = '' + currencies[index].imageUrl;
    console.log(
      '!from! handleChangeCurrentCurrency',
      index,
      currentSendFromCurrency
    );
    // now API allows send X to X currency
    _setCurrentSendToCurrency(index);
    //
    transferStore.coin = currentSendFromCurrency.code.value;
  }

  if (type === ESendInputType.To) {
    // temporary off
    // _setCurrentSendToCurrency(index);
  }

  isSelectListOpen.value = false;
}

defineEmits(['send-transaction']);

const currencies: ICoin[] = [
  {
    name: 'TBTC',
    code: 'tbtc',
    imageUrl: `${STATIC_BASE_URL}/static/currencies/btc.svg`,
  },
  {
    name: 'TLTC',
    code: 'tltc',
    imageUrl: `${STATIC_BASE_URL}/static/currencies/ltc.svg`,
  },
];

const _setCurrentSendToCurrency = (index: number) => {
  currentSendToCurrency.name.value = currencies[index].name;
  currentSendToCurrency.img = '' + currencies[index].imageUrl;
  currentSendToCurrency.code.value = currencies[index].code;
  console.log('_setCurrentSendToCurrency', index, currentSendFromCurrency);
};

// todo: type FocusEvent not describes event as expected
/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
const onBlur = (event: FocusEvent | any) => {
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

  > .m-base-input {
    height: 80px;
    margin: 0 0 16px;
  }
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
    color: $color-brand-550;

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
    background: $color-white-light;
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
    color: $color-brand-550;
    margin-right: 18px;
  }
}

.options-list {
  position: absolute;
  top: 70px;
  width: 100%;
  right: 0;
  background: $color-white-light;
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
    color: $color-brand-550;
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
  }
}
</style>

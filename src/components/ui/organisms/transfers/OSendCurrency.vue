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
      @input="syncModels"
    >
      <template #append>You send exactly</template>
      <template #actions>
        <o-select-coin-input
          :coins="currencies"
          :current-currency="adoptedCurrentSendFromCurrency"
          @on-select-coin="
            handleChangeCurrentCurrency(
              _getCurrencyIndex($event.code),
              ESendInputType.From
            )
          "
        />
      </template>
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
    >
      <template #append>{{ props.contactName }} will get</template>
      <template #actions>
        <o-select-coin-input
          :coins="currencies"
          :current-currency="adoptedCurrentSendToCurrency"
          @on-select-coin="
            handleChangeCurrentCurrency(
              _getCurrencyIndex($event.code),
              ESendInputType.To
            )
          "
        />
      </template>
    </m-base-input>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, onMounted, ref } from 'vue';
import { useTransferStore } from '@/applications/liber/stores/transfer';

import OSelectCoinInput from '@/components/ui/organisms/transfers/OSelectCoinInput.vue';
import { STATIC_BASE_URL } from '@/constants';
import { ICoin } from '@/applications/liber/models/funds/coin';
import { uiKitKey } from '@/types/symbols';

enum ESendInputType {
  From = 'from',
  To = 'to',
}

const uiKit = inject(uiKitKey);
const { MBaseInput } = uiKit!;

const transferStore = useTransferStore();
let amount = ref('');
let recipientAmount = ref('');

const props = defineProps({
  contactName: {
    type: String,
    default: '',
  },
});

defineEmits(['send-transaction']);

onMounted(() => {
  transferStore.coin = currencies[0].code;
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

let isSelectListOpen = ref(false);

function handleChangeCurrentCurrency(index: number, type: string) {
  if (type === ESendInputType.From) {
    currentSendFromCurrency.name.value = currencies[index].name;
    currentSendFromCurrency.code.value = currencies[index].code;
    currentSendFromCurrency.img = '' + currencies[index].imageUrl;

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

const adoptedCurrentSendFromCurrency = computed(() => ({
  name: currentSendFromCurrency.name.value,
  code: currentSendFromCurrency.code.value,
  img: currentSendFromCurrency.img,
}));

const adoptedCurrentSendToCurrency = computed(() => ({
  name: currentSendToCurrency.name.value,
  code: currentSendToCurrency.code.value,
  img: currentSendToCurrency.img,
}));

const _setCurrentSendToCurrency = (index: number) => {
  currentSendToCurrency.name.value = currencies[index].name;
  currentSendToCurrency.img = '' + currencies[index].imageUrl;
  currentSendToCurrency.code.value = currencies[index].code;
};

const _getCurrencyIndex = (code: string) =>
  currencies.findIndex((e) => e.code === code);

// TODO:MBaseInput needs to be updated to work with v-model
const syncModels = (event: InputEvent) => {
  amount.value = '' + event;
  recipientAmount.value = amount.value;
  transferStore.amount = recipientAmount.value;
};

// todo: type FocusEvent not describes event as expected
/* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
// const onBlur = (event: FocusEvent | any) => {
//   const newElem = event.relatedTarget?.nodeName;
//   const elem = event.target;
//   if (newElem !== 'INPUT' && newElem !== 'BUTTON') {
//     elem.focus();
//   }
// };
</script>

<style lang="scss" scoped>
.change-currency {
  width: 100%;

  > .base-input:deep {
    margin: 0 0 16px;
    height: 70px;
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

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
      disabled-opacity
    >
      <template #append>{{ props.contactName }} will get</template>
      <template #actions>
        <o-select-coin-input
          :coins="currencies"
          :current-currency="adoptedCurrentSendToCurrency"
          :show-select-dialog="false"
          class="select-coin -disabled"
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
import {
  computed,
  ComputedRef,
  inject,
  onBeforeMount,
  onMounted,
  ref,
} from 'vue';
import { useTransferStore } from '@/applications/liber/stores/transfer';

import OSelectCoinInput from '@/components/ui/organisms/transfers/OSelectCoinInput.vue';
import { STATIC_BASE_URL } from '@/constants';
import { uiKitKey } from '@/types/symbols';
import { useAccountStore } from '@/applications/liber/stores/account';
import { useCoinsStore } from '@/applications/liber/stores/coins';

interface ISelectCoin {
  name: string;
  code: string;
  img: string;
}

enum ESendInputType {
  From = 'from',
  To = 'to',
}

const uiKit = inject(uiKitKey);
const { MBaseInput } = uiKit!;

const transferStore = useTransferStore();
let amount = ref('');
let recipientAmount = ref('');
const accountStore = useAccountStore();
const coinsStore = useCoinsStore();

const props = defineProps({
  contactName: {
    type: String,
    default: '',
  },
});

let currentSendFromCurrency = {
  name: ref('BTC'),
  code: ref('btc'),
  img: `${STATIC_BASE_URL}/static/currencies/btc.svg`,
};

const currentSendToCurrency = {
  name: ref('BTC'),
  code: ref('btc'),
  img: `${STATIC_BASE_URL}/static/currencies/btc.svg`,
};

const currencies = computed(() => coinsStore.getCoins);

onBeforeMount(async () => {
  await coinsStore.fetchCoins();
  if (currencies?.value[0]) {
    currentSendFromCurrency.name.value = currencies?.value[0].name;
    currentSendFromCurrency.code.value = currencies?.value[0].code;
    currentSendFromCurrency.img = '' + currencies?.value[0].imageUrl;
    currentSendToCurrency.name.value = currencies?.value[0].name;
    currentSendToCurrency.code.value = currencies?.value[0].code;
    currentSendToCurrency.img = '' + currencies?.value[0].imageUrl;

    transferStore.coin = currentSendFromCurrency.code.value;
  }
});

defineEmits(['send-transaction']);

onBeforeMount(() => {
  let code;

  if (accountStore.accountToSend?.code) {
    code = accountStore.accountToSend.code;
  } else if (accountStore.activeAccount?.code) {
    code = accountStore.activeAccount.code;
  } else {
    code = 'tbtc';
  }

  handleChangeCurrentCurrency(_getCurrencyIndex(code), 'from');
});

onMounted(() => {
  transferStore.coin = currencies?.value[0]?.code;
});

let isSelectListOpen = ref(false);

function handleChangeCurrentCurrency(index: number, type: string) {
  if (type === ESendInputType.From && currencies?.value[index]) {
    currentSendFromCurrency.name.value = currencies?.value[index].name;
    currentSendFromCurrency.code.value = currencies?.value[index].code;
    currentSendFromCurrency.img = '' + currencies?.value[index].imageUrl;

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

const adoptedCurrentSendFromCurrency: ComputedRef<ISelectCoin> = computed(
  () => ({
    name: currentSendFromCurrency.name.value,
    code: currentSendFromCurrency.code.value,
    img: currentSendFromCurrency.img,
  })
);

const adoptedCurrentSendToCurrency: ComputedRef<ISelectCoin> = computed(() => ({
  name: currentSendToCurrency.name.value,
  code: currentSendToCurrency.code.value,
  img: currentSendToCurrency.img,
}));

const _setCurrentSendToCurrency = (index: number) => {
  currentSendToCurrency.name.value = currencies?.value[index].name;
  currentSendToCurrency.img = '' + currencies?.value[index].imageUrl;
  currentSendToCurrency.code.value = currencies?.value[index].code;
};

const _getCurrencyIndex = (code: string) =>
  currencies.value.findIndex((e) => e.code === code);

const syncModels = (event: InputEvent | number | string | null) => {
  const result = event === null ? 0 : event;

  amount.value = '' + result;
  recipientAmount.value = '' + result;
  transferStore.amount = recipientAmount.value;
};
</script>

<style lang="scss" scoped>
.change-currency {
  width: 100%;

  > :deep(.base-input) {
    height: 70px;
  }
}

.fees-data {
  display: flex;
  flex-direction: column;
  justify-content: center;
  border-left: 1px solid $color-primary-50;
  min-height: 112px;
  margin-left: 10px;
  width: 100%;
}

.fees-item {
  display: flex;
  margin-bottom: 10px;
  margin-left: -10px;

  > .circle {
    background: $color-primary-50;
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

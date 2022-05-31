<template>
  <t-top-navigation
    with-fixed-footer
    @click:left-icon="$router.push({ name: Route.DashboardHome })"
  >
    <template #title> Withdraw </template>
    <template #content>
      <base-input v-model="form.address">
        <template #label> Address </template>
        <template #prepend>
          <base-button view="flat"> paste </base-button>
        </template>
      </base-input>
      <base-input
        v-model="form.network"
        class="network-input amount-input"
        :class="{ '-hidden': !form.address }"
      >
        <template #label> Network </template>
      </base-input>
      <base-input
        v-model="form.amount"
        class="amount-input"
        type="number"
        mode="decimal"
        :min-fraction-digits="0"
        :max-fraction-digits="10"
        :class="{ '-error': isInsufficientBalance }"
        @input="onAmountInput"
      >
        <template #label> Amount </template>
        <template #prepend>
          <select-coin-input
            :coins="coins"
            :current-currency="form.coin"
            @on-select-coin="onSelectCoin"
          />
        </template>
        <template v-if="availableBalance" #message>
          {{ isInsufficientBalance ? 'Insufficient amount. ' : '' }}
          {{ availableBalance }} {{ form.coin.code.toUpperCase() }} Available
        </template>
      </base-input>

      <m-network-select-answer v-if="false" />
    </template>
    <template #fixed-footer>
      <base-button block :disabled="isSubmitButtonDisabled">
        Continue
      </base-button>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { Route } from '@/router/types';
import { computed, onBeforeMount, ref } from 'vue';

import { useCoinsStore } from '@/stores/coins';

import {
  BaseButton,
  BaseInput,
  MNetworkSelectAnswer,
  TTopNavigation,
} from '@/components/ui';
import SelectCoinInput from '@/components/ui/molecules/transfers/SelectCoinInput.vue';
import { ICoin } from '@/models/coin/coins';
import { STATIC_BASE_URL } from '@/constants';
import { useAccountStore } from '@/stores/account';

const coinStore = useCoinsStore();
const accountStore = useAccountStore();

const form = ref({
  address: '',
  amount: 0.02,
  network: 'Bitcoin',
  coin: {
    name: '---',
    code: 'empty',
    img: `${STATIC_BASE_URL}/static/currencies/empty_token.svg`,
  },
});

const coins = computed(() => coinStore.getCoins);

const isSubmitButtonDisabled = computed(
  () =>
    isInsufficientBalance.value ||
    !form.value.address ||
    form.value.coin.code === 'empty'
);

const isInsufficientBalance = computed(() => {
  if (selectedCoin.value) {
    return Number(selectedCoin.value.balance) - Number(form.value.amount) <= 0;
  }

  return false;
});

const selectedCoin = computed(() =>
  accountStore.getAccounts.find(({ code }) => code === form.value.coin.code)
);

const availableBalance = computed(() => {
  if (form.value.coin.code === 'empty') {
    return '';
  }

  if (!selectedCoin.value) {
    return '';
  }

  return selectedCoin.value.balance;
});

onBeforeMount(async () => {
  await Promise.all([coinStore.fetchCoins(), accountStore.getAccountList()]);
});

const onSelectCoin = ({ name, code, imageUrl }: ICoin) => {
  form.value.coin = {
    name,
    code,
    img: imageUrl as string,
  };
};

const onAmountInput = (amount: number) => {
  form.value.amount = amount;
};
</script>

<style scoped lang="scss">
.base-input:deep {
  > .input {
    height: 78px;
    background: $color-light-grey-100;
    border-color: $color-primary-100;

    > .p-input-icon-right {
      display: flex;
    }
  }

  &:focus {
    background: black;
  }
}

.amount-input:deep {
  > .input {
    > .p-float-label {
      > .p-component {
        font-weight: 500;
        font-size: 20px;
        line-height: 25px;
        letter-spacing: -0.0045em;
        color: $color-brand-550;

        > .p-inputtext {
          font-weight: 500;
          font-size: 20px;
          line-height: 25px;
          letter-spacing: -0.0045em;
          color: $color-brand-550;
        }
      }
    }
  }

  &.-error {
    > .input {
      border-color: $color-red-500;
    }

    > .message {
      color: $color-red-500;
    }
  }
}

.select:deep {
  right: -4px;
  top: 4px;
  bottom: 4px;
  height: auto;
}

.network-input {
  height: 78px;
  overflow: hidden;
  transition: height, 0.4s linear;

  &.-hidden {
    margin: 0;
    height: 0;
    transition: height, 0.4s linear;
  }
}
</style>

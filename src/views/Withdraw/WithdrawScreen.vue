<template>
  <t-top-navigation
    v-if="!showSummaryScreen"
    with-fixed-footer
    @click:left-icon="$router.back()"
  >
    <template #title> {{ $t('views.withdraw.withdraw') }} </template>
    <template #content>
      <base-input
        v-model.trim="form.address"
        class="address-input"
        :class="{ '-error': !form.address }"
      >
        <template #label>
          {{ $t('views.withdraw.address') }}
        </template>
        <template #prepend>
          <base-button
            v-if="!form.address"
            view="flat"
            class="paste-button"
            @click="handlePaste"
          >
            {{ $t('views.withdraw.paste') }}
          </base-button>
          <i
            v-else
            class="icon-transaction-small-reverted"
            @click="form.address = ''"
          />
        </template>
      </base-input>
      <base-input
        v-model="form.network"
        class="network-input amount-input"
        :class="{ '-hidden': !form.address }"
        @click="openNetworkModal = true"
      >
        <template #label> {{ $t('views.withdraw.network') }} </template>
        <template #prepend>
          <img
            class="arrow-down"
            alt="list"
            :src="`${STATIC_BASE_URL}/static/menu/arrow-down.svg`"
          />
        </template>
      </base-input>
      <base-input
        v-model="form.amount"
        class="amount-input"
        type="number"
        mode="decimal"
        inputmode="decimal"
        :min-fraction-digits="0"
        :max-fraction-digits="10"
        :class="{ '-error': isInsufficientBalance }"
        @input="onAmountInput"
      >
        <template #label>
          {{ $t('views.withdraw.amount') }}
        </template>
        <template #prepend>
          <select-coin-input
            :coins="coins"
            :current-currency="form.coin"
            @on-select-coin="onSelectCoin"
          />
        </template>
        <template v-if="availableBalance" #message>
          {{
            isInsufficientBalance
              ? `${$t('views.withdraw.insufficient')}. `
              : ''
          }}
          {{ availableBalance }} {{ form.coin.code.toUpperCase() }}
          {{ $t('views.withdraw.available') }}
        </template>
      </base-input>

      <p-dialog
        v-model:visible="openNetworkModal"
        :show-header="false"
        class="p-dialog-maximized"
        style="padding: 0 !important"
      >
        <t-top-navigation
          class="modal-view"
          left-icon-name="icon-app-navigation-close"
          @click:left-icon="handleCloseModal"
        >
          <template #content>
            <m-network-select-answer @select="onSelectNetwork" />
          </template>
        </t-top-navigation>
      </p-dialog>

      <o-withdraw-success-toast v-model:visible="showSuccessToast" />
    </template>
    <template #fixed-footer>
      <base-button block :disabled="isSubmitButtonDisabled" @click="onContinue">
        {{ $t('views.withdraw.continue') }}
      </base-button>
    </template>
  </t-top-navigation>
  <o-withdraw-summary
    v-else
    @back="showSummaryScreen = false"
    @success="showSuccessToast"
  />
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, Ref, ref } from 'vue';
import { onBeforeRouteLeave, useRoute } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Clipboard } from '@capacitor/clipboard';

import { useCoinsStore } from '@/stores/coins';
import { ICoin } from '@/models/funds/coin';
import { STATIC_BASE_URL } from '@/constants';
import { useAccountStore } from '@/stores/account';
import { TDictionaryItem } from '@/components/ui/molecules/MNetworkSelectAnswer.vue';
import { useWithdrawStore } from '@/stores/withdraw';
import { useErrorsStore } from '@/stores/errors';

import {
  BaseButton,
  BaseInput,
  MNetworkSelectAnswer,
  OWithdrawSuccessToast,
  OWithdrawSummary,
  TTopNavigation,
} from '@/components/ui';
import SelectCoinInput from '@/components/ui/molecules/transfers/SelectCoinInput.vue';

const withdrawStore = useWithdrawStore();
const coinStore = useCoinsStore();
const accountStore = useAccountStore();
const errorsStore = useErrorsStore();
const route = useRoute();
const { t } = useI18n();

const openNetworkModal = ref(false);
const showSummaryScreen = ref(false);

const form = ref({
  address: '',
  amount: 0,
  network: 'Bitcoin',
  coin: {
    name: '---',
    code: 'empty',
    img: `${STATIC_BASE_URL}/static/currencies/empty_token.svg`,
  },
});

const networks = ref([]) as Ref<string[]>;
const showSuccessToast = ref(false);

const coins = computed(() => {
  return coinStore.getCoins.filter((coin) => {
    return accountStore.getAccounts
      .filter(({ balance }) => balance !== '0')
      .map(({ code }) => code)
      .includes(coin.code);
  });
});

const isLoading = ref(false);
const isSubmitButtonDisabled = computed(
  () =>
    isInsufficientBalance.value ||
    !form.value.address ||
    form.value.coin.code === 'empty' ||
    Number(form.value.amount) === 0
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

onBeforeRouteLeave((_to, _from, next) => {
  withdrawStore.resetData();

  next();
});

onBeforeMount(async () => {
  await Promise.all([
    coinStore.fetchCoins(false),
    accountStore.getAccountList(false),
  ]);

  const preselectedCode = route.params.code;

  console.debug('preselect', preselectedCode);

  if (preselectedCode) {
    const selectedCoin = coins.value.find(
      ({ code }) => preselectedCode === code
    ) as ICoin;

    onSelectCoin(selectedCoin);
  }
});

const handlePaste = async () => {
  try {
    const content = await Clipboard.read();

    if (content && content.type === 'text/plain') {
      form.value.address = content.value;
    }
    /* eslint-disable-next-line  @typescript-eslint/no-explicit-any */
  } catch (err: any) {
    if (
      err.errorMessage &&
      err.errorMessage === 'There is no data on the clipboard'
    ) {
      return;
    }
    errorsStore.handle({
      err,
      name: 'WithdrawScreen',
      ctx: 'pasteFromClipboard',
      description: t('common.pasteClipboardError'),
    });
  }
};

const handleCloseModal = () => {
  openNetworkModal.value = false;
};

const onSelectCoin = ({
  name,
  code,
  imageUrl,
  networks: coinNetworks,
}: ICoin) => {
  form.value.coin = {
    name,
    code,
    img: imageUrl as string,
  };

  networks.value = coinNetworks as string[];
};

const onSelectNetwork = (network: TDictionaryItem) => {
  openNetworkModal.value = false;

  form.value.network = network.body;
};

const onAmountInput = (amount: number) => {
  form.value.amount = amount;
};

const onContinue = async () => {
  try {
    isLoading.value = true;

    await withdrawStore.fetchWithdrawInfo({
      address: form.value.address,
      amount: form.value.amount.toString(),
      code: form.value.coin.code,
      network: 'main',
    });

    showSummaryScreen.value = true;
  } catch (e) {
    await errorsStore.handle({
      err: e,
      name: 'WithdrawalScreen.vue',
      ctx: 'getWithdrawInfo',
      description: "error can't get withdrawal info",
    });
  } finally {
    isLoading.value = false;
  }
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

.paste-button:deep {
  > .container {
    > .label {
      font-weight: 600;
      font-size: 13px;
      line-height: 18px;
      letter-spacing: 0.04em;
      text-transform: uppercase;
    }
  }
}

.address-input:deep {
  &.-error {
    > .input {
      border-color: $color-red-500;
      background: $color-red-50;
    }
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

.arrow-down {
  width: 10px;
  height: 5px;
  margin: auto 14px auto 0;
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

.modal-view {
  padding: 0;
}
</style>

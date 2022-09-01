<template>
  <AccountDetailsSkeleton v-if="!wallet" />

  <template v-else>
    <div class="qr-code-container">
      <qr-code
        :background-options="{ color: 'transparent' }"
        :corners-dot-options="{ type: 'square', color: '#000000' }"
        :corners-square-options="{ type: 'square', color: '#000000' }"
        :dots-options="{
          type: 'square',
          color: '#000000',
        }"
        :height="150"
        :image-options="{ hideBackgroundDots: true, imageSize: 0.4, margin: 0 }"
        :qr-options="{ typeNumber: 0, mode: 'Byte', errorCorrectionLevel: 'L' }"
        :value="walletAddress"
        :width="150"
      />
      <p class="text-default">
        {{ $t('views.deposit.wallet.sendOnly') }} {{ coinCode.toUpperCase() }}
        {{ $t('views.deposit.wallet.address') }}
      </p>
    </div>

    <div class="wallet-block">
      <div class="wallet-info">
        <div class="titled-block">
          <h2 class="title">{{ $t('views.deposit.wallet.network') }}</h2>
          <p class="content">
            {{ wallet.network }}
          </p>
        </div>
        <button class="icon" type="button" @click="createAndSetAccount">
          <i class="ci-repeat" />
        </button>
      </div>

      <div class="wallet-info">
        <div class="titled-block">
          <h2 class="title">{{ $t('views.deposit.wallet.walletAddress') }}</h2>
          <p class="content">
            {{ firstPartOfWalletAddress
            }}<span class="bold">{{ lastPartOfWalletAddress }}</span>
          </p>
        </div>
        <button class="icon" type="button" @click="copyToClipboard">
          <i class="icon-copy" />
        </button>
      </div>

      <!-- <div class="wallet-footer">
        <div class="row row-footer">
          <p class="title">{{ $t('views.deposit.wallet.minimumDeposit') }}</p>
          <p class="content">
            {{ wallet.minimumDeposit }} {{ coinCode.toUpperCase() }}
          </p>
        </div>

        <div class="row row-footer">
          <p class="title">{{ $t('views.deposit.wallet.arrival') }}</p>
          <p class="content">
            {{ wallet.expectedArrival }}
            {{ $t('views.deposit.wallet.networkConfirmations') }}
          </p>
        </div>

        <div class="row row-footer">
          <p class="title">{{ $t('views.deposit.wallet.expectedUnlock') }}</p>
          <p class="content">
            {{ wallet.expectedUnlock }}
            {{ $t('views.deposit.wallet.networkConfirmations') }}
          </p>
        </div>
      </div> -->

      <div class="btns-container">
        <!-- <m-base-button
          :view="ViewBaseButton.Secondary"
          disabled
          @click="saveImage"
        >
          {{ $t('views.deposit.wallet.saveImage') }}
        </m-base-button> -->
        <m-base-button block @click="shareAddress">
          {{ $t('views.deposit.wallet.shareAddress') }}
        </m-base-button>
      </div>
    </div>
  </template>
</template>

<script lang="ts" setup>
import { computed, inject, onBeforeMount, Ref, ref } from 'vue';
import { useI18n } from 'vue-i18n';

// import { ViewBaseButton } from '@/components/ui/molecules/base-button/types';
import { useAccountStore } from '@/applications/liber/stores/account';
import { Clipboard } from '@/helpers/clipboard/clipboard';
import { useToast } from 'primevue/usetoast';
import { check, share } from '@/helpers/nativeShare';

import QrCode from 'qrcode-vue3';
import AccountDetailsSkeleton from './AccountDetailsSkeleton.vue';
import { useErrorsStore } from '@/stores/errors';
import { uiKitKey } from '@/types/symbols';
import { ICreateAccount } from '@/applications/liber/models/account/createAccount';

const uiKit = inject(uiKitKey);
const { MBaseButton } = uiKit!;

const toast = useToast();
const { tm } = useI18n();
const accountStore = useAccountStore();
const errorsStore = useErrorsStore();

const props = defineProps({
  coinCode: {
    type: String,
    required: true,
  },
});

const wallet: Ref<ICreateAccount | null> = ref(null);

const walletAddress = computed(() => {
  return wallet.value?.address;
});

const firstPartOfWalletAddress = computed(() => {
  const length = wallet.value?.address.length;
  if (length) return wallet.value?.address.substring(0, length - 9);
  return '';
});

const lastPartOfWalletAddress = computed(() => {
  const length = wallet.value?.address.length;
  if (length) return wallet.value?.address.substring(length - 9, length);
  return '';
});

onBeforeMount(async () => {
  await createAndSetAccount();
});

const createAndSetAccount = async () => {
  try {
    wallet.value = null;

    const data = await accountStore.createAccount(props.coinCode as string, {
      network: 'default',
      force: true,
    });

    wallet.value = data as ICreateAccount;
  } catch (err) {
    errorsStore.handle({
      err,
      name: 'AccountDetails',
      ctx: 'createAndSetAccount',
      description: 'Error when creating an account',
    });
  }
};

const copyToClipboard = async () => {
  try {
    await Clipboard.write({
      string: wallet.value?.address as string,
    });
    toast.add({
      summary: tm('views.deposit.wallet.copySuccess') as string,
      life: 3000,
      closable: false,
    });
  } catch (err) {
    errorsStore.handle({
      err,
      name: 'AccountDetails',
      ctx: 'copyToClipboard',
      description: tm('views.deposit.wallet.copyFailure') as string,
    });
  }
};

// const saveImage = () => {
//   console.log(tm('views.deposit.wallet.saveImage'));
// };

const shareAddress = async () => {
  const canShare = await check();

  if (!canShare) {
    return toast.add({
      severity: 'error',
      summary: tm('views.deposit.wallet.deviceIsNotSupportedToShare') as string,
      life: 3000,
      closable: false,
    });
  }

  await share({
    title: 'Share address',
    text: wallet.value?.address,
    dialogTitle: 'Share address',
  });
};
</script>

<style lang="scss" scoped>
.qr-code-container {
  flex-grow: 1;
  margin: 28px 0 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.wallet-block {
  background-color: $color-white;
  margin: 0 -15px;
  padding: 15px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.wallet-info {
  display: flex;
  align-items: center;
  padding: 15px;
  padding-bottom: 0;

  > .icon {
    font-size: 24px;
    margin: 0 0 0 15px;
    background: none;
  }
}

.titled-block {
  flex-grow: 1;
  overflow: hidden;

  & > .title {
    font-style: normal;
    font-weight: normal;
    font-size: 13px;
    line-height: 18px;
    letter-spacing: -0.0008em;
    color: $color-dark-grey;
  }

  & > .content {
    overflow-wrap: break-word;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    letter-spacing: -0.0031em;
    color: $color-black;

    > .bold {
      font-weight: bold;
    }
  }
}

.btns-container {
  display: flex;
  justify-content: space-between;
  margin-top: 50px;
}

.text-default {
  color: $color-dark-grey;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  margin: 16px 0 36px;
}

.wallet-footer {
  padding: 15px;
  border: 1px solid $color-brand-2-50;
  border-radius: 12px;
  margin-top: 20px;
  margin-bottom: 40px;

  & > .row {
    margin-top: 6px;
    margin-bottom: 6px;
    display: flex;
    justify-content: space-between;

    & > .title {
      margin-right: 5px;
    }
  }
}

.row-footer {
  font-style: normal;
  font-weight: normal;
  font-size: 13px;
  line-height: 18px;

  & > .content {
    color: $color-brand-primary;
    font-weight: 500;
    text-align: right;
  }
}
</style>

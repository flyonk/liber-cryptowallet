<template>
  <div v-if="wallet" class="page-wrapper">
    <top-navigation
      left-icon-name="ci-close_big"
      @click:left-icon="$router.push({ name: Route.DashboardHome })"
    >
      {{ $t('views.deposit.wallet.deposit') }} {{ coinCode }}
    </top-navigation>

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
        {{ $t('views.deposit.wallet.sendOnly') }} {{ coinCode }}
        {{ $t('views.deposit.wallet.address') }}
      </p>
    </div>

    <div class="wallet-block">
      <div class="wallet-info">
        <div class="titled-block">
          <h2 class="title">{{ $t('views.deposit.wallet.network') }}</h2>
          <p class="content">
            {{ network.text }}
          </p>
        </div>
        <button class="icon" type="button" @click="createAccount">
          <i class="ci-repeat" />
        </button>
      </div>

      <div class="wallet-info">
        <div class="titled-block">
          <h2 class="title">{{ $t('views.deposit.wallet.walletAddress') }}</h2>
          <p class="content">
            {{ walletAddress }}
          </p>
        </div>
        <button class="icon" type="button" @click="copyToClipboard">
          <i class="ci-copy" />
        </button>
      </div>

      <div class="wallet-footer">
        <div class="row row-footer">
          <p class="title">{{ $t('views.deposit.wallet.minimumDeposit') }}</p>
          <p class="content">{{ wallet.minimumDeposit }} {{ coinCode }}</p>
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
      </div>

      <div class="btns-container">
        <base-button
          :view="ViewBaseButton.Secondary"
          disabled
          @click="saveImage"
        >
          {{ $t('views.deposit.wallet.saveImage') }}
        </base-button>
        <base-button @click="shareAddress">
          {{ $t('views.deposit.wallet.shareAddress') }}
        </base-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, onBeforeMount, ref } from 'vue';

import { check, share } from '@/helpers/nativeShare';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';
import { Route } from '@/router/types';
import { useAccountStore } from '@/stores/account';
import { IDepositNetwork, useDepositStore } from '@/stores/deposit';
import { IAccount } from '@/models/account/account';
import { ICreateAccount } from '@/models/account/createAccount';
import QrCode from 'qrcode-vue3';
import { ViewBaseButton } from '@/components/ui/molecules/base-button/types';
import { BaseButton, TopNavigation } from '@/components/ui';

import { Clipboard } from '@capacitor/clipboard';

const toast = useToast();
const { tm } = useI18n();
const depositStore = useDepositStore();
const accountStore = useAccountStore();

const coin = ref<IAccount | null>(null);
const network = ref<IDepositNetwork | null>(null);
const wallet = ref<ICreateAccount | null>(null);

onBeforeMount(async () => {
  coin.value = depositStore.getAccountInfo;

  network.value = depositStore.getNetwork;

  await createAccount();
});

const walletAddress = computed(() => {
  return wallet.value?.address;
});

const coinCode = computed(() => {
  return coin.value?.code.toUpperCase() || '';
});

const saveImage = () => {
  console.log(tm('views.deposit.wallet.saveImage'));
};

const createAccount = async () => {
  const data = await accountStore.createAccount(coin.value?.code as string, {
    network: 'default',
    force: true,
  });

  wallet.value = data as ICreateAccount;
};

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
    console.error(`${tm('views.deposit.wallet.copyFailure')} `, err);
  }
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  padding: 0 15px;
  flex-grow: 1;
  background-color: $color-light-grey-200;
  display: flex;
  flex-direction: column;
}

.main-title {
  font-style: normal;
  font-weight: 800;
  font-size: 28px;
  line-height: 34px;
  letter-spacing: 0.0038em;
  margin-bottom: 10px;
  margin-top: 20px;
}

.qr-code-container {
  flex-grow: 1;
  margin: 28px 0 0;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.qr-code-canvas {
  margin: 0 auto;
  width: 200px;
  display: block;
}

.wallet-block {
  background-color: $color-white;
  margin: 0 -15px -15px;
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
  }
}

.btn-default {
  border-radius: 13px;
  text-align: center;
  box-shadow: none;
  outline: none;
  border: none;
  height: 48px;
  width: 100%;
  font-style: normal;
  font-weight: 600;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.0043em;
}

.btn-primary {
  background-color: $color-primary;
  color: $color-white;
}

.btn-secondary {
  color: $color-primary;
  background-color: transparent;
}

.btns-container {
  display: flex;
  justify-content: space-between;
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
  }
}
</style>

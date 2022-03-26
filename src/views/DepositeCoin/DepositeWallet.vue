<template>
  <div class="page-wrapper">
    <top-navigation
      left-icon-name="ci-close_big"
      @click:left-icon="$router.push({ name: Route.DepositNetwork })"
    >
      {{ $t('views.deposit.wallet.deposit') }} {{ coin }}
    </top-navigation>

    <div class="qr-code-container">
      <canvas ref="canvas" class="qr-code-canvas" />
      <p class="text-default">
        {{ $t('views.deposit.wallet.sendOnly') }} {{ coin }}
        {{ $t('views.deposit.wallet.address') }}
      </p>
    </div>

    <div class="wallet-block">
      <div class="wallet-info">
        <div class="titled-block">
          <h2 class="title">{{ $t('views.deposit.wallet.network') }}</h2>
          <p class="content">
            {{ network }}
          </p>
        </div>
        <button class="icon" type="button" @click="updateNetwork">
          <img alt="Update" src="@/assets/images/update-icon.svg" />
        </button>
      </div>

      <div class="wallet-info">
        <div class="titled-block">
          <h2 class="title">{{ $t('views.deposit.wallet.walletAddress') }}</h2>
          <p class="content">
            {{ wallet }}
          </p>
        </div>
        <button class="icon" type="button" @click="copyToClipboard">
          <img alt="Copy" src="@/assets/images/copy-icon.svg" />
        </button>
      </div>

      <div class="wallet-footer">
        <div class="row row-footer">
          <p class="title">{{ $t('views.deposit.wallet.minimumDeposit') }}</p>
          <p class="content">0.000000001 {{ coin }}</p>
        </div>

        <div class="row row-footer">
          <p class="title">{{ $t('views.deposit.wallet.arrival') }}</p>
          <p class="content">
            1 {{ $t('views.deposit.wallet.networkConfirmation') }}
          </p>
        </div>

        <div class="row row-footer">
          <p class="title">{{ $t('views.deposit.wallet.expectedUnlock') }}</p>
          <p class="content">
            2 {{ $t('views.deposit.wallet.networkConfirmations') }}
          </p>
        </div>
      </div>

      <div class="btns-container">
        <button
          class="btn-default btn-secondary"
          type="button"
          @click="saveImage"
        >
          {{ $t('views.deposit.wallet.saveImage') }}
        </button>
        <button
          class="btn-default btn-primary"
          type="button"
          @click="shareAddress"
        >
          {{ $t('views.deposit.wallet.shareAddress') }}
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue';

import { check, share } from '@/helpers/nativeShare';
import { useToast } from 'primevue/usetoast';
import { useI18n } from 'vue-i18n';

import { TopNavigation } from '@/components/ui';
import QrCodeWithLogo from 'qrcode-with-logos';
import { Route } from '@/router/types';
const toast = useToast();

const { tm } = useI18n();

const canvas = ref<HTMLCanvasElement | undefined>();
let qrCodeValue = ref<string>('');

const coin = ref<string>('Fantom');
const network = ref<string>('Bitcoin');
const wallet = ref('1Mtree35df4543sdgErtrryryEe13rrsd21213Opa139z0l');

onMounted(() => {
  qrCodeValue.value = wallet.value;

  let qrcode = new QrCodeWithLogo({
    canvas: canvas.value,
    content: qrCodeValue.value,
    width: 180,
  });

  qrcode.toCanvas();
});

const saveImage = () => {
  console.log(tm('views.deposit.wallet.saveImage'));
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
    text: wallet.value,
    dialogTitle: 'Share address',
  });
};

const copyToClipboard = () => {
  navigator.clipboard.writeText(wallet.value).then(
    function () {
      toast.add({
        summary: tm('views.deposit.wallet.copySuccess') as string,
        life: 3000,
        closable: false,
      });
    },
    function (err) {
      console.error(`${tm('views.deposit.wallet.copyFailure')} `, err);
    }
  );
};

const updateNetwork = () => {
  console.log(tm('views.deposit.wallet.updateCoinNetwork'));
};
</script>

<style lang="scss" scoped>
.page-wrapper {
  padding: 15px;
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
}

.qr-code-canvas {
  margin: 0 auto;
  width: 200px;
  display: block;
}

.wallet-block {
  background-color: $color-white;
  margin: -15px;
  padding: 15px;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
}

.wallet-info {
  display: flex;
  align-items: center;
  padding: 15px;
  padding-bottom: 0;
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

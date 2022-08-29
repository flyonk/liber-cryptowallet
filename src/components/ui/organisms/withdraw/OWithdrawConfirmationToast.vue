<template>
  <m-base-toast
    v-bind="$attrs"
    content-style="border-radius:32px;"
    @update:visible="$emit('update:visible', $event)"
  >
    <template #image>
      <div class="popup-image">
        <img
          :src="`${STATIC_BASE_URL}/static/media/attention.svg`"
          class="image"
        />
      </div>
    </template>
    <template #content-header>
      <div class="confirmation-header text--title-2 font-weight--semibold">
        {{ $t('views.withdraw.confirmation.title') }}
      </div>
    </template>
    <template #description>
      <div class="confirmation-description text--body">
        {{ $t('views.withdraw.confirmation.description') }}
      </div>
    </template>
    <template #content-footer>
      <m-base-button
        class="confirmation-button"
        block
        size="large"
        @click="$emit('update:visible', false)"
      >
        {{ $t('views.withdraw.confirmation.button.no') }}
      </m-base-button>
      <m-base-button block size="large" view="secondary" @click="onContinue">
        {{ $t('views.withdraw.confirmation.button.yes') }}
      </m-base-button>
    </template>
  </m-base-toast>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';

import { useMfaStore } from '@/stores/mfa';
import { useErrorsStore } from '@/stores/errors';
import { useWithdrawStore } from '@/applications/liber/stores/withdraw';
import { uiKitKey } from '@/types/symbols';
import { STATIC_BASE_URL } from '@/constants';
import { UiKitInterface } from '@/types/uiKit';
import { useUIStore } from '@/stores/ui';
import { EToastSeverity } from '@/types/toast';

const uiKit = inject(uiKitKey);
const { MBaseToast, MBaseButton } = uiKit as UiKitInterface;

const mfaStore = useMfaStore();
const errorsStore = useErrorsStore();
const withdrawStore = useWithdrawStore();
const uiStore = useUIStore();
const { tm } = useI18n();
const router = useRouter();

defineEmits(['update:visible', 'success']);

const onContinue = async () => {
  await mfaStore.show({
    button: 'views.withdraw.confirmation.button.submit',
    title: 'views.withdraw.confirmation.text',
    callback: () => {
      router.back();

      uiStore.showToast({
        severity: EToastSeverity.success,
        title: tm('views.withdraw.success.title'),
        description: tm('views.withdraw.success.description'),
      });
    },
  });

  await onSubmitWithdrawal();
};

const onSubmitWithdrawal = async () => {
  try {
    await withdrawStore.withdraw();
  } catch (e) {
    await errorsStore.handle({
      err: e,
      name: 'Withdraw',
      ctx: 'withdrawConfirmation',
      description: 'Error on withdraw confirmation',
    });
  }
};
</script>

<style lang="scss" scoped>
.confirmation-header {
  margin: 0 0 8px;
  color: $color-brand-primary;
}

.confirmation-description {
  color: $color-dark-grey;
  margin: 0 0 64px;
}

.confirmation-button {
  margin: 0 0 12px;
}

.popup-image {
  display: flex;
  justify-content: center;
  width: 100%;

  > .image {
    width: 50px;
    height: 50px;
  }
}
</style>

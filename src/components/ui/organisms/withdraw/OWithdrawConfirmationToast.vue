<template>
  <base-toast
    v-bind="$attrs"
    :severity="'attention'"
    @update:visible="$emit('update:visible', $event)"
  >
    <template #header>
      <div class="confirmation-header text--title-2 font-weight--semibold">
        {{ $t('views.withdraw.confirmation.title') }}
      </div>
    </template>
    <template #description>
      <div class="confirmation-description text--body">
        {{ $t('views.withdraw.confirmation.description') }}
      </div>
    </template>
    <template #footer>
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
  </base-toast>
</template>

<script setup lang="ts">
import { useMfaStore } from '@/stores/mfa';
import { useErrorsStore } from '@/stores/errors';
import { useWithdrawStore } from '@/applications/liber/stores/withdraw';
import { BaseToast } from '@/components/ui';
import { MBaseButton } from '@liber-biz/crpw-ui-kit-liber';

const mfaStore = useMfaStore();
const errorsStore = useErrorsStore();
const withdrawStore = useWithdrawStore();

defineEmits(['update:visible', 'success']);

const onContinue = async () => {
  await mfaStore.show({
    button: 'views.withdraw.confirmation.button.submit',
    title: 'views.withdraw.confirmation.text',
    callback: () => {
      withdrawStore.setSuccessToastState(true);
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
</style>

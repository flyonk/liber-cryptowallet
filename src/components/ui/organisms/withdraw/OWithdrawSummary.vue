<template>
  <t-top-navigation with-fixed-footer @click:left-icon="$emit('back')">
    <template #title> {{ $t('views.withdraw.withdraw') }} </template>
    <template #content>
      <div class="withdraw-summary">
        <div class="item">
          <div class="label">{{ $t('views.withdraw.address') }}</div>
          <div class="value">{{ info.address }}</div>
        </div>
        <div class="item">
          <div class="label">{{ $t('views.withdraw.amount') }}</div>
          <div class="value">{{ info.requestAmount }} {{ currencyText }}</div>
        </div>
        <div class="item">
          <div class="label">{{ $t('views.withdraw.fee') }}</div>
          <div class="value">{{ info.fee }} {{ currencyText }}</div>
        </div>
        <div class="item -bold">
          <div class="label">{{ $t('views.withdraw.total') }}</div>
          <div class="value">{{ info.total }} {{ currencyText }}</div>
        </div>
      </div>

      <OWithdrawConfirmationToast
        v-model:visible="showConfirmationToast"
        @success="withdrawStore.setSuccessToastState(true)"
      />
    </template>
    <template #fixed-footer>
      <m-base-button block @click="showConfirmationToast = true">
        {{ $t('views.withdraw.withdrawNow') }}
      </m-base-button>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { computed, inject, ref } from 'vue';

import { useWithdrawStore } from '@/applications/liber/stores/withdraw';

import { OWithdrawConfirmationToast, TTopNavigation } from '@/components/ui';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { MBaseButton } = uiKit!;

const withdrawStore = useWithdrawStore();

defineEmits(['back']);

const showConfirmationToast = ref(false);

const info = computed(() => withdrawStore.getWithdrawInfo);
const currencyText = computed(() => info.value.currencyCode.toUpperCase());
</script>

<style scoped lang="scss">
.withdraw-summary {
  width: 100%;

  > .item {
    display: flex;
    justify-content: space-between;
    padding: 0 0 24px;
    margin: 0 0 24px;
    border-bottom: 1px solid $color-grey-100;

    &.-bold {
      font-weight: 700;
    }

    > .label {
      min-width: 90px;
    }

    > .value {
      word-break: break-all;
      text-align: right;
    }
  }
}
</style>

<template>
  <m-base-toast v-bind="$attrs" @update:visible="setToastState">
    <template #image>
      <div class="popup-image">
        <img
          :src="`${STATIC_BASE_URL}/static/media/confirmation.svg`"
          class="image"
        />
      </div>
    </template>
    <template #header>
      <div class="success-header font-weight--medium text--title-3">
        {{ $t('views.withdraw.success.title') }}
      </div>
    </template>
    <template #description>
      <div class="success-description text--body">
        {{ $t('views.withdraw.success.description') }}
      </div>
    </template>
  </m-base-toast>
</template>

<script lang="ts" setup>
import { inject } from 'vue';
import { useWithdrawStore } from '@/applications/liber/stores/withdraw';
import { uiKitKey } from '@/types/symbols';
import { STATIC_BASE_URL } from '@/constants';

const uiKit = inject(uiKitKey);
const { MBaseToast } = uiKit!;

const withdrawStore = useWithdrawStore();

const setToastState = (state: boolean) => {
  withdrawStore.setSuccessToastState(state);
};
</script>

<style lang="scss" scoped>
.success-header {
  color: $color-brand-primary;
  margin: 0 0 4px;
}

.success-description {
  color: $color-dark-grey;
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

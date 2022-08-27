<template>
  <m-base-toast
    v-model:visible="showPasscodeToast"
    content-style="border-radius:32px;"
    @click="closePasscodeToast()"
  >
    <template #image>
      <div class="popup-image">
        <img
          :src="`${STATIC_BASE_URL}/static/media/confirmation.svg`"
          class="image"
        />
      </div>
    </template>
    <template #description>
      <div>{{ $t('views.passcodeEnter.successChange') }}</div>
    </template>
  </m-base-toast>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { uiKitKey } from '@/types/symbols';
import { STATIC_BASE_URL } from '@/constants';
import { inject } from 'vue';
import { usePasscodeStore } from '@/stores/passcode';

const passcodeStore = usePasscodeStore();

const uiKit = inject(uiKitKey);
const { MBaseToast } = uiKit!;

const showPasscodeToast = computed(() => {
  return passcodeStore.getShowPasscodeToast;
});

const closePasscodeToast = () => {
  passcodeStore.toggleSuccessPasscodeToast(false);
};
</script>

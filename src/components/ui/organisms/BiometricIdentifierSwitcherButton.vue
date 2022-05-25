<template>
  <li class="item" @click="onSwitcherChange">
    <img class="icon" alt src="@/assets/icon/touchid.svg" />
    <p class="text">
      {{ $t('views.profile.profileSettings.signIn') }}
    </p>
    <InputSwitch :model-value="isEnabled" class="switcher" />
  </li>
</template>

<script lang="ts" setup>
import { onBeforeMount, ref, Ref } from 'vue';
import { useI18n } from 'vue-i18n';

import { EStorageKeys } from '@/types/storage';
import { getSupportedOptions, verifyIdentity } from '@/helpers/identification';
import { showConfirm } from '@/helpers/nativeDialog';
import { useAppOptionsStore } from '@/stores/appOptions';

import InputSwitch from 'primevue/inputswitch';

const { tm } = useI18n();
const appOptionsStore = useAppOptionsStore();

const isEnabled = ref(false);
const identifierType = ref('face-id') as Ref<'face-id' | 'touch-id'>;

const setIdentificationOption = async () => {
  const option = await getSupportedOptions();

  if (option === 'face-id' || option === 'touch-id') {
    identifierType.value = option;
  }
};

const onSwitcherChange = async () => {
  const key =
    identifierType.value === 'face-id'
      ? EStorageKeys.faceid
      : EStorageKeys.touchid;

  const identifierName =
    identifierType.value === 'face-id' ? 'Face ID' : 'Touch ID';

  if (!isEnabled.value) {
    await verifyIdentity();

    await appOptionsStore.setOptions('true', key);

    isEnabled.value = true;
  } else {
    const submitted = await showConfirm({
      title:
        (tm(
          'views.profile.profileSettings.confirmNativeVerificationTitle'
        ) as string) +
        ' ' +
        identifierName,
      message:
        (tm(
          'views.profile.profileSettings.confirmNativeVerification'
        ) as string) +
        ' ' +
        identifierName +
        '?',
      okButtonTitle: tm('views.profile.profileSettings.logoutAccept') as string,
      cancelButtonTitle: tm(
        'views.profile.profileSettings.logoutDecline'
      ) as string,
    });

    if (submitted) {
      await appOptionsStore.setOptions('', key);
      isEnabled.value = false;
    }
  }
};

onBeforeMount(async () => {
  await setIdentificationOption();

  await appOptionsStore.init();

  isEnabled.value =
    !!appOptionsStore.getOptions.faceid || !!appOptionsStore.getOptions.touchid;
});
</script>

<style lang="scss" scoped>
.item {
  display: flex;
  align-items: center;
  height: 56px;
  border-top: 1px solid rgb(175 179 195 / 30%);

  &:last-child {
    border-bottom: 1px solid rgb(175 179 195 / 30%);
  }

  > .icon {
    margin-right: 12px;
  }

  > .text {
    font-weight: 500;
    font-size: 16px;
    line-height: 21px;
    display: flex;
    align-items: center;
    letter-spacing: -0.0031em;
    color: $color-brand-primary;
  }

  > .switcher {
    margin-left: auto;
    margin-right: 12px;
  }

  > .selected-language {
    margin-left: auto;
  }
}
</style>

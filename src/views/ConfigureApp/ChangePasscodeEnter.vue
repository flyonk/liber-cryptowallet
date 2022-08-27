<template>
  <t-top-navigation
    :left-icon-name="iconName"
    class="passcode-container"
    @click:left-icon="router.back()"
  >
    <template #title>
      {{ title }}
    </template>
    <template #content>
      <div class="passcode">
        <base-passcode
          v-if="actionType === EPasscodeActions.store"
          :action-type="actionType"
          :show-touch-faceid="showNativeVerification"
          @submit="onCreate"
        />
        <base-passcode
          v-if="actionType === EPasscodeActions.update"
          :action-type="actionType"
          :show-touch-faceid="showNativeVerification"
          @submit="onSubmit"
        />
      </div>
      <m-base-toast
        v-model:visible="showErrorToast"
        content-style="border-radius:32px;"
      >
        <template #description>
          <div>{{ $t('configureApp.invalidPassCode') }}</div>
        </template>
      </m-base-toast>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { computed, inject, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useMfaStore } from '@/stores/mfa';
import { useAppOptionsStore } from '@/stores/appOptions';
import { usePasscodeStore } from '@/stores/passcode';

import { EPasscodeActions } from '@/types/base-component';
import { Route } from '@/router/types';
import { useI18n } from 'vue-i18n';

import { BasePasscode, TTopNavigation } from '@/components/ui';
import { uiKitKey } from '@/types/symbols';

const uiKit = inject(uiKitKey);
const { MBaseToast } = uiKit!;

const router = useRouter();
const actionType = ref(EPasscodeActions.store) as Ref<EPasscodeActions>;
const { tm } = useI18n();
const showErrorToast = ref(false);
const mfaStore = useMfaStore();
const appOptionsStore = useAppOptionsStore();
const passcodeStore = usePasscodeStore();

const title = computed(() => {
  switch (actionType.value) {
    case EPasscodeActions.store:
      return tm('views.passcodeEnter.newPasscode');
    case EPasscodeActions.compare:
      return tm('views.passcodeEnter.confirmPasscode');
    default:
      return tm('views.passcodeEnter.createPasscode');
  }
});

const iconName = computed(() => {
  switch (actionType.value) {
    case EPasscodeActions.compare:
      return undefined;
    default:
      return 'icon-app-navigation-close';
  }
});

function onCreate(success: boolean): void {
  if (success) {
    actionType.value = EPasscodeActions.update;
  }
}

function onSubmit(success: boolean): void {
  if (success) {
    mfaStore.show({
      successRoute: router.resolve({ name: Route.ProfileMainView }).path,
    });
    passcodeStore.toggleSuccessPasscodeToast(true);
  } else {
    showErrorToast.value = true;
  }
}

const showNativeVerification = computed(() => {
  const { faceid, touchid } = appOptionsStore.getOptions;
  return faceid || touchid;
});
</script>

<style lang="scss" scoped>
.change-passcode {
  padding: 0 16px;
}

.splash {
  & > .illustration {
    display: flex;
    flex-direction: column;
    align-items: center;

    & > .text {
      text-align: center;
    }
  }
}

.passcode {
  margin: 132px 0 0;
}
</style>

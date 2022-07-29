<template>
  <t-top-navigation
    left-icon-name="icon-app-navigation-close"
    class="passcode-container"
    @click:left-icon="router.push({ name: Route.ChangePasscode })"
  >
    <template #title>
      {{ title }}
    </template>
    <template #content>
      <div class="passcode">
        <base-passcode
          v-if="actionType === EPasscodeActions.store"
          :action-type="actionType"
          :show-touch-faceid="false"
          @submit="onCreate"
        />
        <base-passcode
          v-if="actionType === EPasscodeActions.compare"
          :action-type="actionType"
          :show-touch-faceid="false"
          @submit="onSubmit"
        />
      </div>
      <m-base-toast v-model:visible="showErrorToast" severity="error">
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
function onCreate(success: boolean): void {
  if (success) {
    actionType.value = EPasscodeActions.compare;
  }
}

function onSubmit(success: boolean): void {
  console.log(success);
  if (success) {
    mfaStore.show({
      successRoute: Route.ProfileSettings,
    });
  } else {
    showErrorToast.value = true;
  }
}
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

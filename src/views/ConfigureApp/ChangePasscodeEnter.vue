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
          v-if="actionType === EPasscodeActions.update"
          :action-type="EPasscodeActions.update"
        />\
      </div>
    </template>
  </t-top-navigation>
</template>

<script lang="ts" setup>
import { computed, Ref, ref } from 'vue';
import { useRouter } from 'vue-router';

import { EPasscodeActions } from '@/types/base-component';
import { Route } from '@/router/types';
import { useI18n } from 'vue-i18n';

import { BasePasscode, TTopNavigation } from '@/components/ui';

const router = useRouter();
const actionType = ref(EPasscodeActions.store) as Ref<EPasscodeActions>;
const { tm } = useI18n();

const title = computed(() => {
  switch (actionType.value) {
    case EPasscodeActions.store:
      return tm('views.passcodeEnter.newPasscode');
    case EPasscodeActions.update:
      return tm('views.passcodeEnter.confirmPasscode');
    default:
      return tm('views.passcodeEnter.createPasscode');
  }
});
function onCreate(success: boolean): void {
  if (success) {
    actionType.value = EPasscodeActions.update;
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

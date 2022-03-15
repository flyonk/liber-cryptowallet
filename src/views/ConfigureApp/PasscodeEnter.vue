<template>
  <div class="auth-page-container">
    <top-navigation @click:left-icon="$router.back()">{{
      title
    }}</top-navigation>
  </div>
  <div class="page-wrapper">
    <p class="text-default">{{ $t('configureApp.createPassCode') }}</p>

    <base-passcode
      v-if="actionType === EPasscodeActions.store"
      :action-type="actionType"
      :show-touch-faceid="false"
      @submit="onCreate"
    />

    <base-passcode
      v-if="actionType === EPasscodeActions.compare"
      :show-touch-faceid="false"
      @submit="onSubmit"
    />
  </div>

  <base-toast v-model:visible="showErrorToast" severity="error">
    <template #description>
      <div>{{ $t('configureApp.invalidPassCode') }}</div>
    </template>
  </base-toast>
</template>

<script lang="ts" setup>
import { computed, Ref, ref } from 'vue';
import { BasePasscode, BaseToast, TopNavigation } from '@/components/UI';
import { EPasscodeActions } from '@/types/base-component';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';

const router = useRouter();

const showErrorToast = ref(false);
const actionType = ref(EPasscodeActions.store) as Ref<EPasscodeActions>;
const { tm } = useI18n();

const title = computed(() => {
  switch (actionType.value) {
    case EPasscodeActions.store:
      return tm('views.passcodeEnter.createPasscode');
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
  if (success) {
    router.push({ name: '2fa-app' });
  } else {
    showErrorToast.value = true;
  }
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function prevStep(): void {
  router.push({ name: 'survey' });
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  margin: 15px;
  flex-grow: 1;
}

.text-default {
  font-style: normal;
  font-weight: normal;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: -0.0043em;
  color: $color-brand-primary;
  margin-bottom: 40px;
}
</style>

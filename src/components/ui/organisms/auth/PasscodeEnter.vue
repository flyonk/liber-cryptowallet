<template>
  <t-top-navigation @click:left-icon="$router.back()">
    <template #title> {{ title }}</template>
    <template #subtitle>{{ $t('configureApp.createPassCode') }}</template>
    <template #content
      ><div class="page-wrapper">
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
      <m-base-toast v-model:visible="showErrorToast" severity="error">
        <template #description>
          <div>{{ $t('configureApp.invalidPassCode') }}</div>
        </template>
      </m-base-toast></template
    >
  </t-top-navigation>
</template>

<script lang="ts">
export default {
  inheritAttrs: false,
};
</script>

<script lang="ts" setup>
import { computed, Ref, ref, onBeforeMount, inject } from 'vue';
import { BasePasscode, TTopNavigation } from '@/components/ui';
import { EPasscodeActions } from '@/types/base-component';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
import { Route } from '@/router/types';
import { PropType } from 'vue-demi';
import { get } from '@/helpers/storage';
import { EStorageKeys } from '@/types/storage';
import { EUiKit } from '@/types/uiKit';

const uiKit = inject(EUiKit.uiKit);
const { MBaseToast } = uiKit as any;

defineEmits(['back']);
const props = defineProps({
  redirectOnSuccessRoute: {
    type: String as PropType<Route>,
    required: true,
  },
  emitOnBack: {
    type: Boolean,
    default: false,
  },
  toCreate: {
    type: Boolean,
    default: true,
  },
});
const router = useRouter();

const showErrorToast = ref(false);
const actionType = ref(EPasscodeActions.store) as Ref<EPasscodeActions>;
const { tm } = useI18n();

const title = computed(() => {
  switch (actionType.value) {
    case EPasscodeActions.store:
      return props.toCreate
        ? tm('views.passcodeEnter.createPasscode')
        : tm('views.passcodeEnter.changePasscode');
    case EPasscodeActions.compare:
      return tm('views.passcodeEnter.confirmPasscode');

    default:
      return tm('views.passcodeEnter.createPasscode');
  }
});

onBeforeMount(async () => {
  const isExists = (await get(EStorageKeys.passcode)) === 'true';

  if (isExists) {
    actionType.value = EPasscodeActions.compare;
  }
});

function onCreate(success: boolean): void {
  if (success) {
    actionType.value = EPasscodeActions.compare;
  }
}

function onSubmit(success: boolean): void {
  if (success) {
    router.push({ name: props.redirectOnSuccessRoute });
  } else {
    showErrorToast.value = true;
  }
}
</script>

<style lang="scss" scoped>
.page-wrapper {
  margin-top: 80px;
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
